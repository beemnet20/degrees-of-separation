import React from 'react';
import { Avatar } from '@mui/material';

const Node = ({ node }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Avatar sx={{ border: '1px black solid' }} src={node.img} alt={node.name} />
  </div>
);

const Edge = ({ from, to }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Node node={from} />
    <span
      style={{
        margin: '0',
        width: '100px',
        height: '0px',
        border: '1px black solid',
      }}
    ></span>
    <Node node={to} />
  </div>
);

const Queue = ({ nodes }) => (
  <div
    style={{
      display: 'flex',
      overflowX: 'auto',
      border: '1px solid black',
      padding: '10px',
    }}
  >
    {nodes.map((node, index) => (
      <div key={index} style={{ marginRight: '10px' }}>
        <Node node={node} />
      </div>
    ))}
  </div>
);

export default function Explanation({ data }) {
  //get the nodes for Kevin Bacon, Tom Cruise, and Tom Hanks
  const queueElements = data.nodes.filter((node) =>
    ['102', '129', '158'].includes(node.id),
  );

  return (
    <>
      <h2>How does it work?</h2>
      <article>
        <p>
          The Degrees of Separation game, popularized as Six Degrees of Kevin
          Bacon, is an excellent example of the application of{' '}
          <strong>breadth-first search (BFS)</strong>, a classic algorithm in
          computer science.
        </p>
        <p>
          BFS is particularly suited for this game due to its ability to explore
          relationships in the <em>shortest path first</em> manner. It starts
          from a selected actor (source node) and explores all their directly
          connected actors (neighbors) first, before moving to the next level of
          connections. This stepwise expansion continues until the target actor
          is found or all possible connections are exhausted. Here are the basic
          components:
        </p>
        <section>
          <h4>Node</h4>
          <p>
            In a search process, data is often stored in a node, a data
            structure that contains the following data
          </p>
          <ul>
            <li>
              A <em>state</em>
            </li>
            <li>
              Its <em>parent node</em>, through which the current node was
              generated
            </li>
            <li>
              The <em>action</em> that was applied to the state of the parent to
              get to the current node
            </li>
          </ul>
          <p>
            In BFS, each actor is considered a node in the graph. Each node
            contains information about the actor such as their name and
            birthdate. The following shows the node for Kevin Bacon.
          </p>
          <Node node={queueElements[0]} />

          <h4>Edge</h4>
          <p>
            An edge represents a movie that two actors (nodes) have in common.
            In the context of BFS, these edges are the links between actors. The
            following shows the edge between Kevin Bacon and Tom Cruise. Both
            actors have been in the movie (edge) A Few Good Men.
          </p>
          <Edge from={queueElements[0]} to={queueElements[1]} />

          <h4>Queue</h4>
          <p>
            Queue is a type of datastructure that is used to store nodes. BFS
            uses a FIFO (First In, First Out) queue. Actors are enqueued (added
            to the end of the queue) and dequeued (removed from the front) in a
            systematic order to explore each actor's connections.
          </p>
          <Queue nodes={queueElements} />
          <h4>Frontier</h4>
          <p>
            In BFS, the <strong>frontier</strong> represents the collection of
            all nodes that are reachable from the source node but have not been
            visited yet. It's effectively the "edge" of our expanding
            exploration area. In the Degrees of Separation game, it includes all
            actors directly connected to the actors we have already explored,
            but whom we have not yet explored ourselves. The queue used in BFS
            helps manage this frontier efficiently, ensuring we visit nodes in
            the order they were discovered.
          </p>
          <p>
            The frontier starts by containing an initial state and an empty set
            of explored items, and then repeats the following actions until a
            solution is reached:
          </p>
          <p>Repeat</p>
          <ol>
            <li>
              If the frontier is empty,
              <ul>
                <li>
                  <em>Stop.</em> There is no solution to the problem.
                </li>
              </ul>
            </li>
            <li>
              Remove a node from the frontier. This is the node that will be
              considered.
            </li>
            <li>
              If the node contains the goal state,
              <ul>
                <li>
                  Return the solution. <em>Stop.</em>
                </li>
              </ul>
              Else,
              <ul>
                <li>
                  Expand the node (find all the new nodes that could be reached
                  from this node), and add resulting nodes to the frontier.
                </li>
                <li>Add the current node to the explored set</li>
              </ul>
            </li>
          </ol>
        </section>
      </article>
    </>
  );
}
