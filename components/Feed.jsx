"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      console.log(data);
      if (data && searchText) {
        const searchRegex = new RegExp(searchText.toLowerCase(), "i");
        const filteredItems = data.filter((posts) => searchRegex.test(posts.prompt.toLowerCase()) || searchRegex.test(posts.tag) || searchRegex.test(posts.creator.username.toLowerCase()));
        setPosts(filteredItems);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or a user name" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
}

export default Feed;
