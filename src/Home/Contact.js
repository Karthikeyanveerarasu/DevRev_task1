import "./Contact.css";
import React, { useEffect, useState } from "react";
import Load from "../loader/Load";
import Navbarr from "./Navbar";

export default function Contact() {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setLoad(false);
  }, []);
  return (
    <>
      {load ? (
        <Load />
      ) : (
        <>
          <Navbarr />
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="well well-sm">
                  <div class="text-center mt-3">
                    <p
                      class="hover-underline-animation text-uppercase"
                      style={{ fontSize: "1.2rem", fontWeight: "900" }}
                    >
                      Contact Us
                    </p>
                  </div>
                  <form>
                    <div class="row justify-content-md-center mt-2">
                      <div class="col-md-5 mt-2">
                        <div class="form-group">
                          <label for="name">Name</label>
                          <input
                            type="text"
                            class="form-control mt-3"
                            id="name"
                            placeholder="Enter name"
                            required="required"
                          />
                        </div>
                        <div class="form-group mt-3">
                          <label for="email">Email Address</label>
                          <div class="input-group mt-3">
                            <span class="input-group-addon">
                              <span class="glyphicon glyphicon-envelope"></span>
                            </span>
                            <input
                              type="email"
                              class="form-control"
                              id="email"
                              placeholder="Enter email"
                              required="required"
                            />
                          </div>
                        </div>
                        <div class="form-group mt-3">
                          <label for="subject">Subject</label>
                          <select
                            id="subject"
                            name="subject"
                            class="form-control mt-3"
                            required="required"
                          >
                            <option value="na" selected="">
                              Choose One:
                            </option>
                            <option value="service">
                              General Customer Service
                            </option>
                            <option value="suggestions">Suggestions</option>
                            <option value="product">Product Support</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group mt-2">
                          <label for="name">Message</label>
                          <textarea
                            name="message"
                            id="message"
                            class="form-control mt-3"
                            rows="9"
                            cols="25"
                            required="required"
                            placeholder="Message"
                          ></textarea>
                        </div>
                      </div>
                      <div class="col-md-12 text-center mt-4 ">
                        <button class="text-center contact_btn">
                          <div class="svg-wrapper-1">
                            <div class="svg-wrapper">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                              >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                  fill="currentColor"
                                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <span>Send</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
