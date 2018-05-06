import React from 'react';
import Tree from 'react-d3-tree';
 
const myTreeData = [
  {
    name: 'Bieganie',
    attributes: {
      keyA: 'val A',
      keyB: 'val B',
      keyC: 'val C',
    },
    children: [
      {
        name: 'Przebiegnij 2km',
        attributes: {
          keyA: 'Muszę to zrobić',
          mora: "Olo"
        },
      },
      {
        name: 'Zjedz banana',
      },
    ],
  },
];
 
class Graph extends React.Component {
  render() {
    return (
    
      <div id="treeWrapper" style={{width: '50em', height: '20em'}}>
 
        <Tree data={myTreeData} />
 
      </div>
    );
  }
}

export default Graph;