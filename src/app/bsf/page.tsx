"use client"

import React, { useState, useEffect, useRef } from 'react';

const Graph = ({ graph, bfsOrder, currentStep, isDarkMode }) => {
    const canvasRef = useRef(null);
    const nodePositions = useRef({});
    const visitedNodes = bfsOrder.slice(0, currentStep);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Basic layout for nodes
        const nodes = Object.keys(graph);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) * 0.8;
        nodes.forEach((node, index) => {
            const angle = (index / nodes.length) * 2 * Math.PI;
            nodePositions.current[node] = {
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle),
            };
        });

        // Draw edges
        ctx.strokeStyle = isDarkMode ? '#555' : '#888';
        ctx.lineWidth = 2;
        for (const node in graph) {
            graph[node].forEach(neighbor => {
                ctx.beginPath();
                ctx.moveTo(nodePositions.current[node].x, nodePositions.current[node].y);
                ctx.lineTo(nodePositions.current[neighbor].x, nodePositions.current[neighbor].y);
                ctx.stroke();
            });
        }

        // Draw nodes
        const nodeRadius = 25;
        for (const node in graph) {
            ctx.beginPath();
            ctx.arc(nodePositions.current[node].x, nodePositions.current[node].y, nodeRadius, 0, 2 * Math.PI);
            ctx.fillStyle = visitedNodes.includes(node) ? '#aaf' : (isDarkMode ? '#333' : '#eee');
            ctx.fill();
            ctx.strokeStyle = isDarkMode ? '#ddd' : '#333';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw node labels
            ctx.fillStyle = isDarkMode ? '#eee' : '#000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node, nodePositions.current[node].x, nodePositions.current[node].y);
        }
    }, [graph, bfsOrder, currentStep, isDarkMode]);

    return <canvas ref={canvasRef} width={600} height={400} className="border border-gray-300 dark:border-gray-700" />;
};

const BFSVisualizer = () => {
    const [graph, setGraph] = useState({
        'A': ['B', 'C'],
        'B': ['D', 'E'],
        'C': ['F'],
        'D': [],
        'E': ['F'],
        'F': []
    });
    const [startNode, setStartNode] = useState('A');
    const [bfsOrder, setBfsOrder] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [speed, setSpeed] = useState(1000);
    const [newNode, setNewNode] = useState('');
    const [edgeStartNode, setEdgeStartNode] = useState('');
    const [edgeEndNode, setEdgeEndNode] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false); // Example dark mode state

    useEffect(() => {
        // BFS Algorithm
        const doBFS = () => {
            const visited = new Set();
            const queue = [startNode];
            const traversalOrder = [];
            visited.add(startNode);
            traversalOrder.push(startNode);

            while (queue.length > 0) {
                const currentNode = queue.shift();
                for (const neighbor of graph[currentNode] || []) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                        traversalOrder.push(neighbor);
                    }
                }
            }
            setBfsOrder(traversalOrder);
            setCurrentStep(0);
        };

        doBFS();
        setIsRunning(false);
    }, [graph, startNode]);

    useEffect(() => {
        if (isRunning) {
            if (currentStep < bfsOrder.length) {
                const timer = setTimeout(() => {
                    setCurrentStep(currentStep + 1);
                }, speed);
                return () => clearTimeout(timer);
            } else {
                setIsRunning(false);
            }
        }
    }, [isRunning, currentStep, bfsOrder, speed]);


    const handleStartBFS = () => {
        setIsRunning(true);
        setCurrentStep(0);
    };

    const handleResetBFS = () => {
        setIsRunning(false);
        setCurrentStep(0);
    };

    const handleSpeedChange = (e) => {
        setSpeed(parseInt(e.target.value, 10));
    };

    const handleAddNode = () => {
        if (newNode && !graph.hasOwnProperty(newNode)) {
            setGraph(prevGraph => ({ ...prevGraph, [newNode]: [] }));
            setNewNode('');
        } else if (graph.hasOwnProperty(newNode)) {
            alert("Node already exists!");
            setNewNode('');
        } else {
            alert("Please enter a node name.");
        }
    };

    const handleAddEdge = () => {
        if (edgeStartNode && edgeEndNode && graph.hasOwnProperty(edgeStartNode) && graph.hasOwnProperty(edgeEndNode) && edgeStartNode !== edgeEndNode) {
            setGraph(prevGraph => ({
                ...prevGraph,
                [edgeStartNode]: [...(prevGraph[edgeStartNode] || []), edgeEndNode]
            }));
            setEdgeStartNode('');
            setEdgeEndNode('');
        } else if (!graph.hasOwnProperty(edgeStartNode) || !graph.hasOwnProperty(edgeEndNode)) {
            alert("One or both nodes do not exist in the graph.");
        } else if (edgeStartNode === edgeEndNode) {
            alert("Start and end nodes cannot be the same.");
        }
        else {
            alert("Please enter valid start and end nodes for the edge.");
        }
    };

    const handleRemoveNode = (nodeToRemove) => {
        const newGraph = { ...graph };
        delete newGraph[nodeToRemove];
        for (const node in newGraph) {
            newGraph[node] = newGraph[node].filter(neighbor => neighbor !== nodeToRemove);
        }
        setGraph(newGraph);
        if (startNode === nodeToRemove) {
            setStartNode(Object.keys(newGraph)[0] || 'A'); // Reset start node if removed
        }
    };

    const handleRemoveEdge = (startNodeEdge, endNodeEdge) => {
        if (graph.hasOwnProperty(startNodeEdge)) {
            const updatedEdges = graph[startNodeEdge].filter(neighbor => neighbor !== endNodeEdge);
            setGraph(prevGraph => ({
                ...prevGraph,
                [startNodeEdge]: updatedEdges
            }));
        }
    };

    return (
        <div className={`p-4 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            <h2 className="text-2xl font-bold mb-4">BFS Visualization</h2>
            <Graph graph={graph} bfsOrder={bfsOrder} currentStep={currentStep} isDarkMode={isDarkMode} />

            <div className="mt-4 flex items-center space-x-4">
                {/* Start Node Selection */}
                <div>
                    <label htmlFor="startNode" className="block text-sm font-medium">Start Node:</label>
                    <select
                        id="startNode"
                        value={startNode}
                        onChange={(e) => setStartNode(e.target.value)}
                        className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        {Object.keys(graph).map(node => (
                            <option key={node} value={node}>{node}</option>
                        ))}
                    </select>
                </div>

                {/* Speed Control */}
                <div>
                    <label htmlFor="speedControl" className="block text-sm font-medium">Speed:</label>
                    <input
                        type="range"
                        id="speedControl"
                        min="100"
                        max="2000"
                        step="100"
                        value={speed}
                        onChange={handleSpeedChange}
                        className="mt-1"
                    />
                    <span className="text-sm ml-2">{speed}ms delay</span>
                </div>
            </div>

            {/* BFS Control Buttons */}
            <div className="mt-4 space-x-2">
                <button
                    onClick={handleStartBFS}
                    disabled={isRunning}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    {isRunning ? 'Running...' : 'Start BFS'}
                </button>
                <button
                    onClick={handleResetBFS}
                    disabled={isRunning || currentStep === 0}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-800"
                >
                    Reset
                </button>
            </div>

            {/* Add Node */}
            <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold mb-2">Add Node</h3>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Node Name"
                        value={newNode}
                        onChange={(e) => setNewNode(e.target.value.toUpperCase())}
                        className="p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button
                        onClick={handleAddNode}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Node
                    </button>
                </div>
            </div>

            {/* Add Edge */}
            <div className="mt-4 border-t border-gray-300 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold mb-2">Add Edge</h3>
                <div className="flex space-x-2 items-center">
                    <select
                        value={edgeStartNode}
                        onChange={(e) => setEdgeStartNode(e.target.value.toUpperCase())}
                        className="p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="">Start Node</option>
                        {Object.keys(graph).map(node => (
                            <option key={node} value={node}>{node}</option>
                        ))}
                    </select>
                    <span className="mx-1">to</span>
                    <select
                        value={edgeEndNode}
                        onChange={(e) => setEdgeEndNode(e.target.value.toUpperCase())}
                        className="p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="">End Node</option>
                        {Object.keys(graph).map(node => (
                            <option key={node} value={node}>{node}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleAddEdge}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Edge
                    </button>
                </div>
            </div>

            {/* Remove Node and Edge */}
            <div className="mt-4 border-t border-gray-300 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold mb-2">Remove Nodes/Edges</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Remove Node:</label>
                        <select
                            onChange={(e) => handleRemoveNode(e.target.value)}
                            className="p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                        >
                            <option value="">Select Node</option>
                            {Object.keys(graph).map(node => (
                                <option key={node} value={node}>{node}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Remove Edge:</label>
                        <div className="flex space-x-2">
                            <select
                                value={edgeStartNode} // Reusing state for simplicity, consider separate if needed
                                onChange={(e) => setEdgeStartNode(e.target.value.toUpperCase())}
                                className="p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-1/2"
                            >
                                <option value="">Start Node</option>
                                {Object.keys(graph).map(node => (
                                    <option key={node} value={node}>{node}</option>
                                ))}
                            </select>
                            <select
                                value={edgeEndNode} // Reusing state for simplicity
                                onChange={(e) => setEdgeEndNode(e.target.value.toUpperCase())}
                                className="p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-1/2"
                            >
                                <option value="">End Node</option>
                                {graph[edgeStartNode]?.map(neighbor => (
                                    <option key={neighbor} value={neighbor}>{neighbor}</option>
                                ))}
                            </select>
                            <button
                                onClick={() => handleRemoveEdge(edgeStartNode, edgeEndNode)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mt-6">
                <strong>BFS Order:</strong> {bfsOrder.slice(0, currentStep).join(' -> ')}
            </div>

            {/* Example Dark Mode Toggle (Optional - for full theme switch) */}
            {/* <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="mt-4 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-2 px-4 rounded"
            >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button> */}
        </div>
    );
};

export default BFSVisualizer;