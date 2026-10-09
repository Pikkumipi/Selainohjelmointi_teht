import ReactDOM from 'react-dom/client'

import React from 'react'
import App from './App'

const CANDIDATES = [
    {
        id: 1,
        name: "Mattila Mika",
        party: "The Greens",
        votes : 23435
    },
    {
        id: 2,
        name: "Anttila Sanna",
        party: "National Coalition Party",
        votes : 11223
    },
    {
        id: 3,
        name: "Hakkarainen Maria",
        party: "The Greens",
        votes : 34561
    },
    {
        id: 4,
        name: "Mattila Mika",
        party: "Social Democratic Party",
        votes : 23454
    },
    {
        id: 5,
        name: "Maunula Tiina",
        party: "National Coalition Party",
        votes : 15342
    },
    {
        id: 6,
        name: "Sepponen Jaana",
        party: "The Greens",
        votes : 5342
    },
    {
        id: 7,
        name: "Juvonen Janne",
        party: "The Greens",
        votes : 32532
    },
    {
        id: 8,
        name: "Andersson Ritva",
        party: "National Coalition Party",
        votes : 12543
    }
]

ReactDOM.createRoot(document.getElementById('root')).render(<App candidates={CANDIDATES}/>)