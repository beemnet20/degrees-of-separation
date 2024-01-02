import { Avatar } from '@mui/material';

export function Node({ node }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Avatar
        sx={{ border: '1px black solid' }}
        src={node.img}
        alt={node.name}
      />
    </div>
  );
}

export function Edge({ from, to }) {
  return (
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
}

export function Queue({ nodes }){ return (
  <div
    style={{
      display: 'flex',
      overflowX: 'auto',
      border: '1px solid black',
      padding: '10px',
      minHeight: '40px'
    }}
  >
    {nodes.map((node, index) => (
      <div key={index} style={{ marginRight: '10px' }}>
        <Node node={node} />
      </div>
    ))}
  </div>
)};
