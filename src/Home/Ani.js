import Lottie from "react-lottie";
import animation from "../lottie/help.json";
export default function Ani() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <>
      <div>
        <div class="container">
          <div class="row">
            <div class="col-xl-8 col-md-8 mt-5">
              <div class="text-center mt-3">
                <p
                  class="hover-underline-animation text-uppercase"
                  style={{ fontSize: "1.2rem", fontWeight: "900" }}
                >
                  A reader lives a thousand lives before he dies!{" "}
                </p>
              </div>
              <div class="text-justify mt-3">
                <p>
                  We believe in the power of knowledge and the joy of reading.
                  We are an innovative and forward-thinking ebooks company
                  dedicated to providing you with a world-class digital reading
                  experience. Our mission is to make books accessible to
                  everyone, anytime, and anywhere.{" "}
                </p>
              </div>
              <div class="text-justify mt-3">
                <p>
                  We are not just a company; we are a community of book lovers
                  who are passionate about fostering a love for reading. We
                  believe in connecting readers from around the world, enabling
                  them to share their thoughts, recommendations, and literary
                  discoveries. Our vibrant online forums and book clubs provide
                  a platform for meaningful discussions and interactions,
                  creating a sense of belonging and camaraderie among our
                  readers.
                </p>
              </div>
            </div>
            <div class="col-xl-4 col-md-4 mb-5">
              <Lottie options={defaultOptions} height={300} width={300} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
