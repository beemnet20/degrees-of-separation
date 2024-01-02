class Node {
  constructor(state, parent, action) {
    this.state = state;
    this.parent = parent;
    this.action = action;
  }
}

class StackFrontier {
  constructor() {
    this.frontier = [];
  }

  add(node) {
    this.frontier.push(node);
  }

  containsState(state) {
    return this.frontier.some((node) => node.state === state);
  }

  isEmpty() {
    return this.frontier.length === 0;
  }

  remove() {
    if (this.isEmpty()) {
      throw new Error('Empty frontier');
    } else {
      return this.frontier.pop();
    }
  }
}

class QueueFrontier extends StackFrontier {
  remove() {
    if (this.isEmpty()) {
      throw new Error('Empty frontier');
    } else {
      return this.frontier.shift();
    }
  }
}

function neighborsForPerson(personId, data) {
  // Assuming 'people' and 'movies' are available in the scope
  let movieIds = data.people[personId].movies;
  let neighbors = new Set();

  movieIds.forEach((movieId) => {
    data.movies[movieId].stars.forEach((starId) => {
      if (starId !== personId) {
        // To avoid adding the original person
        neighbors.add([movieId, starId]);
      }
    });
  });
  return Array.from(neighbors);
}

export default function shortestPath(source, target, data) {
  // Check edge cases
  if (source === null || target === null) {
    return null;
  }

  // Initialize frontier to just the starting position
  let start = new Node(source, null, null);
  let frontier = new QueueFrontier();
  frontier.add(start);

  // Initialize an empty explored set to contain actor ids
  let explored = new Set();

  let steps = [];
  steps.push({
    frontier: frontier.frontier.map((n) => n.state),
    explored: Array.from(explored),
    current: null, // Placeholder, will be set after removing the node
    solutionFound: false,
  });

  // Keep looping until solution found
  while (true) {
    // If nothing left in frontier, then no path
    if (frontier.isEmpty()) {
      return { success: false };
    }
    // Inside your while loop, just before removing the node from the frontier
    steps.push({
      frontier: frontier.frontier.map((n) => n.state),
      explored: Array.from(explored),
      current: null, // Placeholder, will be set after removing the node
      solutionFound: false,
    });

    // Now remove the node and set the current state
    let node = frontier.remove();
    steps[steps.length - 1].current = node.state;
    // Choose a node from the frontier
    explored.add(node.state);


    // Add neighbors to frontier
    const neighbors = neighborsForPerson(node.state, data);
    for (const [action, state] of neighbors) {
      if (!frontier.containsState(state) && !explored.has(state)) {
        // If node is the goal, then we have a solution
        if (state === target) {
          let shortestPath = [[action, state]];
          while (node.parent !== null) {
            shortestPath.push([node.action, node.state]);
            node = node.parent;
          }
          shortestPath.reverse();
          steps.push({
            frontier: frontier.frontier.map((n) => n.state),
            explored: Array.from(explored),
            current: target,  // This is the node being processed in this step
            solutionFound: true
          });
          return { success: true, solution: shortestPath, steps: steps };
        }
        let child = new Node(state, node, action);
        frontier.add(child);
      }
    }
  }
}
