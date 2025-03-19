"use client"

import React, { useState, useEffect, useRef } from 'react';

// TypeScript interfaces
interface Edge {
    to: string;
    weight: number;
}

interface GraphType {
    [key: string]: Edge[];
}

interface NodePosition {
    x: number;
    y: number;
}

interface NodePositions {
    [key: string]: NodePosition;
}

// Helper function for Dijkstra's algorithm
interface DistanceMap {
    [key: string]: number;
}

interface PreviousMap {
    [key: string]: string | null;
}

interface GraphProps {
    graph: GraphType;
    traversalOrder: string[];
    currentStep: number;
    isDarkMode: boolean;
    algorithm: 'bfs' | 'dijkstra';
    shortestPath: string[] | null;
}

const Graph: React.FC<GraphProps> = ({
                                         graph,
                                         traversalOrder,
                                         currentStep,
                                         isDarkMode,
                                         algorithm,
                                         shortestPath
                                     }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodePositions = useRef<NodePositions>({});
    const visitedNodes = traversalOrder.slice(0, currentStep);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

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
        for (const node in graph) {
            graph[node].forEach(edge => {
                const neighbor = edge.to;
                const weight = edge.weight;

                // Calculate the start and end points
                const startPos = nodePositions.current[node];
                const endPos = nodePositions.current[neighbor];

                // Check if this edge is part of the shortest path
                const isShortestPathEdge = shortestPath &&
                    shortestPath.includes(node) &&
                    shortestPath.includes(neighbor) &&
                    ((shortestPath.indexOf(node) === shortestPath.indexOf(neighbor) - 1) ||
                        (shortestPath.indexOf(neighbor) === shortestPath.indexOf(node) - 1));

                // Draw the edge
                ctx.beginPath();
                ctx.moveTo(startPos.x, startPos.y);
                ctx.lineTo(endPos.x, endPos.y);

                // Style depends on whether it's in the shortest path
                if (isShortestPathEdge) {
                    ctx.strokeStyle = '#f00'; // Red for shortest path
                    ctx.lineWidth = 3;
                } else {
                    ctx.strokeStyle = isDarkMode ? '#555' : '#888';
                    ctx.lineWidth = 2;
                }
                ctx.stroke();

                // Draw the weight in the middle of the edge
                const midX = (startPos.x + endPos.x) / 2;
                const midY = (startPos.y + endPos.y) / 2;

                // Background for weight text
                ctx.fillStyle = isDarkMode ? 'rgba(40, 40, 40, 0.7)' : 'rgba(255, 255, 255, 0.7)';
                ctx.beginPath();
                ctx.arc(midX, midY, 12, 0, 2 * Math.PI);
                ctx.fill();

                // Weight text
                ctx.fillStyle = isDarkMode ? '#fff' : '#000';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = '12px Arial';
                ctx.fillText(weight.toString(), midX, midY);
            });
        }

        // Draw nodes
        const nodeRadius = 25;
        for (const node in graph) {
            ctx.beginPath();
            ctx.arc(nodePositions.current[node].x, nodePositions.current[node].y, nodeRadius, 0, 2 * Math.PI);

            // Node color based on status
            if (shortestPath && shortestPath.includes(node)) {
                ctx.fillStyle = '#ff9999'; // Light red for shortest path nodes
            } else if (visitedNodes.includes(node)) {
                ctx.fillStyle = '#aaf'; // Blue for visited nodes
            } else {
                ctx.fillStyle = isDarkMode ? '#333' : '#eee';
            }

            ctx.fill();
            ctx.strokeStyle = isDarkMode ? '#ddd' : '#333';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw node labels
            ctx.fillStyle = isDarkMode ? '#eee' : '#000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '14px Arial';
            ctx.fillText(node, nodePositions.current[node].x, nodePositions.current[node].y);
        }
    }, [graph, traversalOrder, currentStep, isDarkMode, algorithm, shortestPath]);

    return <canvas ref={canvasRef} width={600} height={400} className="border border-gray-300 dark:border-gray-700" />;
};

const GraphVisualizer: React.FC = () => {
    // Initial graph with weights
    const [graph, setGraph] = useState<GraphType>({
        'A': [{ to: 'B', weight: 4 }, { to: 'C', weight: 2 }],
        'B': [{ to: 'D', weight: 5 }, { to: 'E', weight: 2 }],
        'C': [{ to: 'F', weight: 3 }],
        'D': [],
        'E': [{ to: 'F', weight: 1 }],
        'F': []
    });

    const [startNode, setStartNode] = useState<string>('A');
    const [endNode, setEndNode] = useState<string>('F');
    const [traversalOrder, setTraversalOrder] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [speed, setSpeed] = useState<number>(1000);
    const [newNode, setNewNode] = useState<string>('');
    const [edgeStartNode, setEdgeStartNode] = useState<string>('');
    const [edgeEndNode, setEdgeEndNode] = useState<string>('');
    const [edgeWeight, setEdgeWeight] = useState<number>(1);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [algorithm, setAlgorithm] = useState<'bfs' | 'dijkstra'>('bfs');
    const [shortestPath, setShortestPath] = useState<string[] | null>(null);
    const [distances, setDistances] = useState<DistanceMap>({});

    // BFS Algorithm
    const doBFS = () => {
        const visited = new Set<string>();
        const queue: string[] = [startNode];
        const traversalOrder: string[] = [];
        visited.add(startNode);
        traversalOrder.push(startNode);

        while (queue.length > 0) {
            const currentNode = queue.shift()!;
            for (const edge of graph[currentNode] || []) {
                const neighbor = edge.to;
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                    traversalOrder.push(neighbor);
                }
            }
        }

        setTraversalOrder(traversalOrder);
        setCurrentStep(0);
        setShortestPath(null);
        setDistances({});
    };

    // Dijkstra's Algorithm
    const doDijkstra = () => {
        const nodes = Object.keys(graph);
        const distances: DistanceMap = {};
        const previous: PreviousMap = {};
        const unvisited = new Set<string>(nodes);
        const traversalOrder: string[] = [];

        // Initialize distances and previous
        nodes.forEach(node => {
            distances[node] = node === startNode ? 0 : Infinity;
            previous[node] = null;
        });

        while (unvisited.size > 0) {
            // Find the node with the smallest distance
            let current: string | null = null;
            let smallestDistance = Infinity;

            for (const node of unvisited) {
                if (distances[node] < smallestDistance) {
                    smallestDistance = distances[node];
                    current = node;
                }
            }

            // If we can't find a node with a smaller distance, we're done
            if (current === null || distances[current] === Infinity) break;

            // Add to traversal order
            traversalOrder.push(current);

            // Remove from unvisited
            unvisited.delete(current);

            // If we've reached the end node, we can stop
            if (current === endNode) break;

            // Update distances to neighbors
            for (const edge of graph[current] || []) {
                const neighbor = edge.to;
                const weight = edge.weight;
                const distance = distances[current] + weight;

                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                    previous[neighbor] = current;
                }
            }
        }

        // Reconstruct the shortest path
        const path: string[] = [];
        let current = endNode;

        // Check if there is a path to the end node
        if (previous[endNode] !== null || endNode === startNode) {
            while (current !== null) {
                path.unshift(current);
                current = previous[current] as string | null;
            }
        }

        setTraversalOrder(traversalOrder);
        setShortestPath(path.length > 0 ? path : null);
        setDistances(distances);
        setCurrentStep(0);
    };

    useEffect(() => {
        if (algorithm === 'bfs') {
            doBFS();
        } else {
            doDijkstra();
        }
        setIsRunning(false);
    }, [graph, startNode, endNode, algorithm]);

    useEffect(() => {
        if (isRunning) {
            if (currentStep < traversalOrder.length) {
                const timer = setTimeout(() => {
                    setCurrentStep(currentStep + 1);
                }, speed);
                return () => clearTimeout(timer);
            } else {
                setIsRunning(false);
            }
        }
    }, [isRunning, currentStep, traversalOrder, speed]);

    const handleStartAlgorithm = () => {
        setIsRunning(true);
        setCurrentStep(0);
    };

    const handleResetAlgorithm = () => {
        setIsRunning(false);
        setCurrentStep(0);
    };

    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        if (edgeStartNode && edgeEndNode && edgeWeight > 0 &&
            graph.hasOwnProperty(edgeStartNode) &&
            graph.hasOwnProperty(edgeEndNode) &&
            edgeStartNode !== edgeEndNode) {

            // Check if the edge already exists
            const edgeExists = graph[edgeStartNode].some(edge => edge.to === edgeEndNode);

            if (edgeExists) {
                // Update weight if edge exists
                setGraph(prevGraph => ({
                    ...prevGraph,
                    [edgeStartNode]: prevGraph[edgeStartNode].map(edge =>
                        edge.to === edgeEndNode ? { ...edge, weight: edgeWeight } : edge
                    )
                }));
            } else {
                // Add new edge
                setGraph(prevGraph => ({
                    ...prevGraph,
                    [edgeStartNode]: [...(prevGraph[edgeStartNode] || []), { to: edgeEndNode, weight: edgeWeight }]
                }));
            }

            setEdgeStartNode('');
            setEdgeEndNode('');
            setEdgeWeight(1);
        } else if (!graph.hasOwnProperty(edgeStartNode) || !graph.hasOwnProperty(edgeEndNode)) {
            alert("One or both nodes do not exist in the graph.");
        } else if (edgeStartNode === edgeEndNode) {
            alert("Start and end nodes cannot be the same.");
        } else if (edgeWeight <= 0) {
            alert("Weight must be a positive number.");
        } else {
            alert("Please enter valid start and end nodes for the edge.");
        }
    };

    const handleRemoveNode = (nodeToRemove: string) => {
        if (!nodeToRemove) return;

        const newGraph = { ...graph };
        delete newGraph[nodeToRemove];

        // Remove all edges pointing to this node
        for (const node in newGraph) {
            newGraph[node] = newGraph[node].filter(edge => edge.to !== nodeToRemove);
        }

        setGraph(newGraph);

        // Reset start/end nodes if they were removed
        if (startNode === nodeToRemove) {
            setStartNode(Object.keys(newGraph)[0] || '');
        }
        if (endNode === nodeToRemove) {
            setEndNode(Object.keys(newGraph)[0] || '');
        }
    };

    const handleRemoveEdge = (startNodeEdge: string, endNodeEdge: string) => {
        if (!startNodeEdge || !endNodeEdge) return;

        if (graph.hasOwnProperty(startNodeEdge)) {
            const updatedEdges = graph[startNodeEdge].filter(edge => edge.to !== endNodeEdge);
            setGraph(prevGraph => ({
                ...prevGraph,
                [startNodeEdge]: updatedEdges
            }));
        }
    };

    const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAlgorithm(e.target.value as 'bfs' | 'dijkstra');
    };

    // Toggle for undirected/bidirectional edges
    const handleMakeBidirectional = () => {
        if (!edgeStartNode || !edgeEndNode || edgeWeight <= 0) {
            alert("Please enter valid start and end nodes and weight.");
            return;
        }

        // First add the forward edge
        handleAddEdge();

        // Then add the reverse edge
        const temp = edgeStartNode;
        setEdgeStartNode(edgeEndNode);
        setEdgeEndNode(temp);

        // Use setTimeout to ensure state updates before calling handleAddEdge again
        setTimeout(() => handleAddEdge(), 0);
    };

    return (
        <div className={`p-4 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            <h2 className="text-2xl font-bold mb-4">Graph Algorithm Visualizer</h2>

            <div className="mb-4 flex space-x-4">
                <div>
                    <label htmlFor="algorithm" className="block text-sm font-medium">Algorithm:</label>
                    <select
                        id="algorithm"
                        value={algorithm}
                        onChange={handleAlgorithmChange}
                        className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="bfs">Breadth-First Search</option>
                        <option value="dijkstra">Dijkstra's Shortest Path</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="darkMode" className="block text-sm font-medium">Theme:</label>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </div>

            <Graph
                graph={graph}
                traversalOrder={traversalOrder}
                currentStep={currentStep}
                isDarkMode={isDarkMode}
                algorithm={algorithm}
                shortestPath={shortestPath}
            />

            <div className="mt-4 flex flex-wrap gap-4">
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

                {/* End Node Selection (for Dijkstra) */}
                {algorithm === 'dijkstra' && (
                    <div>
                        <label htmlFor="endNode" className="block text-sm font-medium">End Node:</label>
                        <select
                            id="endNode"
                            value={endNode}
                            onChange={(e) => setEndNode(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            {Object.keys(graph).map(node => (
                                <option key={node} value={node}>{node}</option>
                            ))}
                        </select>
                    </div>
                )}

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

            {/* Algorithm Control Buttons */}
            <div className="mt-4 space-x-2">
                <button
                    onClick={handleStartAlgorithm}
                    disabled={isRunning}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    {isRunning ? 'Running...' : `Start ${algorithm === 'bfs' ? 'BFS' : 'Dijkstra'}`}
                </button>
                <button
                    onClick={handleResetAlgorithm}
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
                <div className="flex flex-wrap gap-2 items-center">
                    <select
                        value={edgeStartNode}
                        onChange={(e) => setEdgeStartNode(e.target.value)}
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
                        onChange={(e) => setEdgeEndNode(e.target.value)}
                        className="p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="">End Node</option>
                        {Object.keys(graph).map(node => (
                            <option key={node} value={node}>{node}</option>
                        ))}
                    </select>
                    <span className="mx-1">weight:</span>
                    <input
                        type="number"
                        min="1"
                        value={edgeWeight}
                        onChange={(e) => setEdgeWeight(parseInt(e.target.value, 10) || 1)}
                        className="p-2 w-20 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button
                        onClick={handleAddEdge}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Edge
                    </button>
                    <button
                        onClick={handleMakeBidirectional}
                        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Bidirectional
                    </button>
                </div>
            </div>

            {/* Remove Node and Edge */}
            <div className="mt-4 border-t border-gray-300 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold mb-2">Remove Nodes/Edges</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Remove Node:</label>
                        <select
                            onChange={(e) => handleRemoveNode(e.target.value)}
                            className="p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                            value=""
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
                                value={edgeStartNode}
                                onChange={(e) => setEdgeStartNode(e.target.value)}
                                className="p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-1/2"
                            >
                                <option value="">Start Node</option>
                                {Object.keys(graph).map(node => (
                                    <option key={node} value={node}>{node}</option>
                                ))}
                            </select>
                            <select
                                value={edgeEndNode}
                                onChange={(e) => setEdgeEndNode(e.target.value)}
                                className="p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-1/2"
                            >
                                <option value="">End Node</option>
                                {graph[edgeStartNode]?.map(edge => (
                                    <option key={edge.to} value={edge.to}>{edge.to}</option>
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

            {/* Algorithm Status */}
            <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold mb-2">Algorithm Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <strong>Traversal Order:</strong> {traversalOrder.slice(0, currentStep).join(' → ')}
                    </div>

                    {algorithm === 'dijkstra' && shortestPath && (
                        <div>
                            <strong>Shortest Path:</strong> {shortestPath.join(' → ')}
                            <br />
                            <strong>Distance:</strong> {distances[endNode] === Infinity ? 'No path found' : distances[endNode]}
                        </div>
                    )}
                </div>
            </div>

            {/* Graph Structure */}
            <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold mb-2">Graph Structure</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Node</th>
                            <th className="px-4 py-2 text-left">Neighbors (with weights)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(graph).map(node => (
                            <tr key={node} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                <td className="px-4 py-2">{node}</td>
                                <td className="px-4 py-2">
                                    {graph[node].length === 0 ? 'None' : graph[node].map(edge =>
                                        `${edge.to} (${edge.weight})`
                                    ).join(', ')}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GraphVisualizer;