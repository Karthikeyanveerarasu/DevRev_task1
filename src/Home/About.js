import React, { useEffect, useState } from "react";
import Load from "../loader/Load";
import { Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbarr from "./Navbar";
import Ani from "./Ani";
export default function About() {
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();
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
            <Ani />
            <div>
              <hr />
              <div class="text-center mt-2">
                <p
                  class="text-uppercase"
                  style={{ fontSize: "1.2rem", fontWeight: "900" }}
                >
                  Frequently Asked Questions
                </p>
              </div>
              <div class="mt-4">
                <Accordion>
                  <Accordion.Item eventKey="0" class="mt-2">
                    <Accordion.Header>
                      {" "}
                      Do I need an internet connection to read ebooks?
                    </Accordion.Header>
                    <Accordion.Body>
                      Once you have downloaded an ebook onto your device, an
                      internet connection is generally not required to read it.
                      However, an internet connection may be needed initially to
                      download the ebook, sync your reading progress across
                      devices, or access additional features like dictionary
                      look-up or online annotations.{" "}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1" class="mt-3">
                    <Accordion.Header> What is an ebook?</Accordion.Header>
                    <Accordion.Body>
                      An ebook, short for electronic book, is a digital version
                      of a printed book that can be read on various electronic
                      devices such as e-readers, tablets, smartphones, or
                      computers.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2" class="mt-3">
                    <Accordion.Header>
                      How do I purchase an ebook
                    </Accordion.Header>
                    <Accordion.Body>
                      Purchasing an ebook is easy. Simply visit our website or
                      app, browse through our collection, select the ebook you
                      want to purchase, and follow the prompts to complete the
                      transaction. Once purchased, you can instantly download
                      and start reading the ebook on your preferred device.{" "}
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3" class="mt-3">
                    <Accordion.Header>
                      Can I return or get a refund for an ebook?
                    </Accordion.Header>
                    <Accordion.Body>
                      Due to the nature of digital content, ebook purchases are
                      typically non-refundable. However, if you encounter
                      technical issues or have concerns about your purchase,
                      please reach out to our customer support, and we'll be
                      happy to assist you in resolving any problems.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4" class="mt-3">
                    <Accordion.Header>
                      Are all books available in ebook format?
                    </Accordion.Header>
                    <Accordion.Body>
                      While a vast number of books are available in ebook
                      format, not all titles may be available digitally. The
                      availability of specific books as ebooks depends on the
                      rights and permissions granted by the publishers or
                      authors. However, the ebook market continues to expand,
                      and new titles are regularly being released in digital
                      format.{" "}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div style={{ height: "50px" }}></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
