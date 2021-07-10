import React from "react";
import Sidebar from "./Sidebar";
import SearchIcon from "@material-ui/icons/Search";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import "./Search.css";
import Widgets from "./Widgets";
import axios from "axios";
import { useState } from "react";
import SearchItem from "./SearchItem";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Search = (props) => {
  const [type, setType] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [limit, setLimit] = useState(1);
  const submitHandler = (pagenumber, init) => {
    setLoading(true);
    const url = "http://pazapp.ir/account/search";
    const formData = new FormData();
    formData.append("serachfield", keyword);
    formData.append("type", type);
    formData.append("page_num", pagenumber);
    formData.append("page_size", limit);
    const config = {
      headers: { Authorization: document.cookie.slice(14) },
    };
    axios
      .post(url, formData, config)
      .then((res) => {
        if (res.data.result) {
          setResults(res.data.result);
          if (init) {
            let tmp = [];

            for (let i = 1; i <= res.data.pages; i++) {
              tmp.push(i);
            }
            setPages(tmp);
          }
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  return (
    <>
      <Sidebar myId={props.me.id} />
      <div className="container">
        <div>
          <Form inline className="items_container">
            <SearchIcon className="widgets_searchIcon" />
            <InputGroup className="mb-2-mr-sm-2">
              <FormControl
                id="keyword"
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
                placeholder="keyword"
              />
            </InputGroup>

            <Form.Control
              as="select"
              className="mr-sm-2"
              id="inlineFormCustomSelect"
              custom
              onChange={(e) => {
                setType(e.target.value);
                console.log(type);
              }}
            >
              <option value="none">Choose type</option>
              <option value="user">user</option>
              <option value="hashtag">hashtag</option>
              <option value="post">post</option>
            </Form.Control>
            <input
              type="number"
              style={{ width: "100px", marginRight: "2em" }}
              placeholder="num in a page"
              max="10"
              min="1"
              onChange={(e) => {
                setLimit(e.target.value);
              }}
            />
            <Button
              className="mb-2"
              onClick={() => {
                submitHandler(1, true);
              }}
            >
              Search
            </Button>
          </Form>
        </div>

        {loading ? (
          <Loading />
        ) : (
          results.map((item, index) => (
            <Link to={`/user/${item.id}`}>
              <SearchItem
                avatar={item.image}
                username={item.username}
                bio={item.bi}
              />
            </Link>
          ))
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyItem: "center",
            justifyContent: "center",
          }}
        >
          {pages.map((item, index) => (
            <Button
              className="pagination"
              onClick={() => {
                submitHandler(item, false);
              }}
              key={index}
            >
              <span>{item}</span>
            </Button>
          ))}
        </div>
      </div>
      <Widgets />
    </>
  );
};

export default Search;
