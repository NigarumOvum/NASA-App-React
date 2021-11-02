import React from "react";
import styled from "styled-components";
import { useState } from "react";
import '../../App.css';
import '../../styles/home.css';
import NavBar from '../components/NavBar';
import Earth_Background from '../../img/Earth_Background.mp4';
import VideoPreview from "./VideoPreview";


export default function HomeVideo({items, collection}) {
    const [search, setSearch] = useState("");
    const [videos, setVideos] = useState(items, collection);
    return (
        <>
        <div className="Home">
              <video class="Video_Background" autoPlay loop muted>
              <source src={Earth_Background} type="video/mp4"/>
          </video>
          <NavBar />
          <Jumbotron>
      <h1>Search a video </h1>
         <input
          className="SearchBarHome"
          id="nasaSearch"
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for an video"
        ></input>
        <button
          className="button"
          disabled={search === ""}
          onClick={async () => {
            const results = await fetch(
              `https://images-api.nasa.gov/search?q=${search}&page=1&media_type=video`
            );
            const vid = await results.json();
            setVideos( vid.collection.items);
            console.log({vid});
            
          }}
        >
          Search
        </button>
        <div>
          <div>
            {videos &&
              videos.map((vid)  => (
                <VideoPreview
                  key={vid.data[0].title}
                  videoPreview={vid.links[0].href}
                  videoPlay={vid.href[0]}
                  title={vid.data[0].title}
                  description={vid.data[0].description}
                  nasaId={vid.data[0].nasa_id}
                />
              ))
              }
          </div>
        </div>
</Jumbotron>
        </div>
        </>
    )
}
const Jumbotron = styled.div`
margin-top:2%;
`;
