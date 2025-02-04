import React from "react";
import { assets } from "../assets/assets/assets";

function About() {
  return (
    <div className="mt-24">
      <p className="text-center text-gray-600 text-2xl mb-4">
        About <span className="text-blue-700 ">Us</span>{" "}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <div></div>

        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={assets.about_image}
            alt=""
          />
        </div>
        <div className="flex-1 text-xl  rounded-lg p-8 py-7 bg-white mx-2">
          <section id="about">
            <p >
              Welcome to <strong>NidanDental</strong>, your go-to platform for
              seamless scheduling and time management. <br /> Our platform is
              designed to simplify booking appointments, managing schedules, and
              staying organized.
            </p>
            <p>
              With a user-friendly interface and smart time slot generation, we
              aim to save you time and make planning effortless. <br /> Whether
              you're a busy professional or someone who values efficiency,{" "}
              <strong>NidanDental</strong> offers the tools you need to stay in
              control of your day.
            </p>
            <p>
              Experience the ease of organized time management – because every
              minute matters.
            </p>
          </section>
        </div>
      </div>
      <div className="flex mt-20  flex-col flex-wrap justify-center xl:flex-row gap-4 ">
        <div className="flex text-xl flex-col  flex-shrink-0  flex-1 items-start py-12 mx-10 px-16 border-2   bg-primary text-white transition-all  rounded-xl duration-500" >
          <p className="font-bold">Effciency:</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam
            est, a quidem sequi numquam animi eligendi consequatur mollitia sed.
            Temporibus.
          </p>
        </div>
        <div className="flex text-xl flex-col transition-all duration-500 flex-1 items-start py-12 mx-10 px-16 border-2  bg-primary text-white">
          <p className="font-bold">Effciency:</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam
            est, a quidem sequi numquam animi eligendi consequatur mollitia sed.
            Temporibus.
          </p>
        </div>
        <div className="flex text-xl  flex-col transition-all duration-500 flex-1 items-start py-12 mx-10 px-16 border-2   bg-primary text-white">
          <p className="font-bold">Effciency:</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam
            est, a quidem sequi numquam animi eligendi consequatur mollitia sed.
            Temporibus.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
