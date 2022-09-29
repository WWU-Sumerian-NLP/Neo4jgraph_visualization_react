import React, {useEffect, useRef} from "react";
import useResizeAware from "react-resize-aware";
import PropTypes from "prop-types";
import {NeoVis, NEOVIS_ADVANCED_CONFIG, objectToTitleHtml} from "neovis.js";
import "./NeoGraph.css";

let vis 
let onSubmit 

const NeoGraph = (props) => {
    const {
      width,
      height,
      containerId,
      backgroundColor,
      neo4jUri,
      neo4jUser,
      neo4jPassword,

      infoPreId,
      onSubmitFunction
    } = props;
  
    const visRef = useRef();
    onSubmit = onSubmitFunction
  
    useEffect(() => {
      const config = {
        containerId: visRef.current.id,

        visConfig: {
          edges: { 
            arrows: {
              to: {enabled: true}
            }
          }
        },       

        neo4j: {
            serverUrl: neo4jUri,
            serverUser: neo4jUser,
            serverPassword: neo4jPassword,
        },

        labels: {
            "Person": {
                label: "name",
                caption: "tablet_num",
                title_properties: [
                    "name",
                    "tablet_num"
                ],
                [NEOVIS_ADVANCED_CONFIG]: {
                  function: {
                    title: objectToTitleHtml
                  },
                  static: {
                    font: {
                      size: 20,
                      color: '#421b75',
                      strokeWidth: 0
                    }
                  }
                }
            },
        
            "Animal": {
                label: "name",
            },

        },
        relationships: {
          "person:delivers_animal  ": {
              label: "name",
              value: "weight",
              [NEOVIS_ADVANCED_CONFIG]: {
                function: {
                  title: objectToTitleHtml
                }
              }
            }
        },
        initialCypher: "MATCH p=()-[r:`person:delivers_animal  `]->() RETURN p LIMIT 50",
        
      };
      vis = new NeoVis(config);
      vis.registerOnEvent('completed', () => { 
        //code after render here
        vis.network.on('click', (event) => {
          console.log(event)
          clickHandler(event, infoPreId)
        })
        vis.network.on('doubleClick', (event) => {
          doubleClickHandler(event)
        })
      })
      vis.render();

    }, [neo4jUri, neo4jUser, neo4jPassword]);
  
    return (
      <div
        id={containerId}
        ref={visRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: `${backgroundColor}`,
        }}
      />
    );
  };


  
  const ResponsiveNeoGraph = (props) => {
    const [resizeListener, sizes] = useResizeAware();
  
    const side = Math.max(sizes.width, sizes.height) / 2;
    const neoGraphProps = { ...props, width: side * 1.99, height: side * 0.7 };
    return (
      <div style={{ position: "relative" }}>
        {resizeListener}
        <NeoGraph {...neoGraphProps} />
      </div>
    );
  };
  
  ResponsiveNeoGraph.defaultProps = {
    backgroundColor: "#d3d3d3",
  };
  
  ResponsiveNeoGraph.propTypes = {
    containerId: PropTypes.string.isRequired,
    neo4jUri: PropTypes.string.isRequired,
    neo4jUser: PropTypes.string.isRequired,
    neo4jPassword: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    infoPreId: PropTypes.string
  };

  function clickHandler(event, infoPreId) {
    if (event.nodes[0] !== undefined) {
      const properties = vis.network.body.nodes[event.nodes[0]].options.raw.properties
      let text = properties.name
      console.log("text", text)
      if (properties.url !== ''){
        text = `<a href=${properties.url}>${text}</a>`
        console.log("new text", text)
      }
      document.getElementById(infoPreId).innerHTML = text 
    } else if (event.edges[0] !== undefined) {
      const edge = vis.network.body.edges[event.edges[0]]
      console.log(edge.title.innerHTML)
      const properties = parseEdgeTitle(edge.title)
      // console.log("edge properties:", properties)
      let relation = `${edge.from.options.raw.properties.name} --${properties.relation}--> ${edge.to.options.raw.properties.name}`
      document.getElementById(infoPreId).innerHTML = `${relation}<br>${properties.sentence}`
      console.log("realtions", relation)
      console.log("properties:", properties)
    }
  }

  function doubleClickHandler(event){
    if(event.nodes[0] !== undefined) {
      onsubmit(vis.network.body.nodes[event.nodes[0]].options.raw.properties.name)
    }
  }
  
  function parseEdgeTitle(title) {
    console.log(title)
    const result = {sentence: '', url: '', relation: ''}
    // const data = title.toString().match('^<strong>sentence:</strong> (.*)<br><strong>relation_url:</strong> (.*)<br><strong>relation:</strong> (.*)<br>$')
    console.log(title[1])
    // if(data.length === 4) {
    //   result.sentence = data[1]
    //   result.url = data[2]
    //   result.relation = data[3]
    // }
    return result 
  }

  function stabilize() {
    vis.stabilize()
  }

  function showAll() {
    vis.renderWithCypher('MATCH(n)-[r]->(m) RETURN *')
  }

  function clearAll() {
    vis.renderWithCypher('MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n, r')
  }

  function hideAll(name) {
    vis.clearNetwork()
  }

  function updateGraph (name) {
    vis.updateWithCypher('MATCH (n)-[r]->(m) RETURN *')
  }


export { NeoGraph, ResponsiveNeoGraph, stabilize, showAll, clearAll, hideAll, updateGraph};