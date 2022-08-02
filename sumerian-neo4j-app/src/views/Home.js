import React, { useState } from 'react'
import {Card, Container, Form, Label, Segment} from 'semantic-ui-react'
import {useReadCypher} from 'use-neo4j'

function SearchResults({ query }) {
    const {loading, records} = useReadCypher('MATCH(p:Person) WHERE p.name CONTAINS $query RETURN p LIMIT 10', {query})
    if(query === '') return <div></div>;

    if(loading) {
        return (
            <div>
                loading ...
            </div>
        )
    }
    const persons = records?.map(row => {
        const person = row.get('p') //person.identity.toNumber(), person.labels, person.properties
        console.log(person)
        const labels = person.labels.map(label => <Label>{label}</Label>)

    return (
        <Card>
            <Card.Content>
                <Card.Header>{person.properties.name}</Card.Header>
                {/* <Card.Meta>
                    <div>{labels}</div>
                    Tablet Number {person.properties.tablet_num}
                </Card.Meta> */}
                {/* <Card.Description>
                    {}
                </Card.Description> */}
            </Card.Content>
        </Card>
    )
    })

    return (
    <div>
        {persons}
    </div>
)}

export default function Home() {
    const [query, setQuery] = useState("");
    return ( 
        <Container> 
            <Segment>
                <Form>
                    <Form.Field>
                        <label htmlFor="query"> Search by name</label>
                        <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
                    </Form.Field>
                </Form>
            </Segment>

            <SearchResults query={query}/>
        </Container>
    )

}