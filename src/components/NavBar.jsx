import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className="bg-gray-800 p-4 shadow-xl mx-auto transform rounded-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      <ul className="text-white text-lg flex justify-between list-none cursor-pointer md:gap-10 sm:gap-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-yellow-400 font-bold bg-slate-600 rounded-xl'
              : 'text-white'
          }
        >
          <li className="hover:text-gray-400 hover:bg-slate-600 transition-colors duration-300 p-3 rounded-xl flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 mb-1"
            >
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
            <span className="hidden sm:hidden md:hidden lg:block">Home</span>
          </li>
        </NavLink>
        <NavLink
          to="/mine"
          className={({ isActive }) =>
            isActive
              ? 'text-yellow-400 font-bold bg-slate-600 rounded-xl'
              : 'text-white'
          }
        >
          <li className="hover:text-gray-400 transition-colors duration-300 p-3 hover:bg-slate-600 rounded-xl flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="currentColor"
              version="1.1"
              id="Capa_1"
              viewBox="0 0 379.416 379.416"
              xmlSpace="preserve"
              className="size-6 mb-1"
            >
              <g>
                <path d="M366.082,195.332l-0.495-0.538c-22.455-24.592-48.208-48.927-78.729-74.395c-4.614-3.851-25.51-20.384-26.486-21.215   s-1.989-1.555-1.775-2.666c0.254-1.319,0.624-2.743,1.06-4.243c0.388-1.336,0.788-2.719,1.094-4.184   c0.557-2.661,0.91-5.032,1.08-7.251l0.01-0.12c0.19-2.474,0.546-7.078-2.327-10.145c-1.008-1.074-2.857-2.356-5.955-2.356   c-2.282,0-4.521,0.689-5.857,1.103l-0.147,0.046c-3.634,1.114-6.873,2.817-9.29,4.177c-1.399,0.787-2.796,1.614-4.146,2.46   c-0.404,0.253-0.81,0.53-1.218,0.812c-1.05,0.725-1.545,1.392-3.079,0.084c-2.122-1.867-25.89-22.144-89.825-51.953   c-10.255-4.781-20.893-9.172-31.615-13.05C97.866,8.096,86.273,4.504,72.946,0.918l-0.407-0.11C70.99,0.389,69.311,0,67.54,0   C64,0,61.036,1.63,59.188,4.59c-1.523,2.441-1.906,5.412-1.049,8.148c0.896,2.866,3.021,5.201,5.825,6.408l7.161,3.083   c28.388,12.212,56.542,29.121,86.072,51.693c10.122,7.738,19.275,15.194,27.981,22.795c4.114,3.592,8.22,7.237,12.203,10.835   c0.354,0.318,3.372,3.191,3.372,3.191L17.508,328.184c-5.761,6.833-8.54,14.704-8.039,22.76c0.479,7.696,4.049,15.149,9.796,20.446   c5.617,5.177,12.942,8.026,20.628,8.026c0.962,0,1.936-0.046,2.892-0.138c8.684-0.831,16.688-5.458,21.96-12.695   c1.593-2.185,156.703-215.057,165.4-227.015c24.118,24.903,46.882,51.772,67.655,79.86c4.086,5.524,11.317,15.82,11.644,16.317   c1.397,2.141,2.982,4.565,5.224,6.351c1.693,1.346,3.663,2.059,5.697,2.059c3.176,0,5.756-1.713,7.42-3.002l37.582-29.109   c4.483-3.896,4.615-7.84,4.615-7.84C370.266,199.869,367.651,197.033,366.082,195.332z" />
              </g>
            </svg>
            <span className="hidden sm:hidden md:hidden lg:block">Mine</span>
          </li>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? 'text-yellow-400 font-bold bg-slate-600 rounded-xl'
              : 'text-white'
          }
        >
          <li className="hover:text-gray-400 transition-colors duration-300 p-3 hover:bg-slate-600 rounded-xl flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-6 mb-1"
            >
              <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z" />
            </svg>
            <span className="hidden sm:hidden md:hidden lg:block">Profile</span>
          </li>
        </NavLink>

        <NavLink
          to="/daily-bonus"
          className={({ isActive }) =>
            isActive
              ? 'text-yellow-400 font-bold bg-slate-600 rounded-xl'
              : 'text-white'
          }
        >
          <li className="hover:text-gray-400 transition-colors duration-300 p-3 hover:bg-slate-600 rounded-xl flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-6 mb-1"
            >
              <path
                fillRule="evenodd"
                d="M10 1c3.866 0 7 1.79 7 4s-3.134 4-7 4-7-1.79-7-4 3.134-4 7-4Zm5.694 8.13c.464-.264.91-.583 1.306-.952V10c0 2.21-3.134 4-7 4s-7-1.79-7-4V8.178c.396.37.842.688 1.306.953C5.838 10.006 7.854 10.5 10 10.5s4.162-.494 5.694-1.37ZM3 13.179V15c0 2.21 3.134 4 7 4s7-1.79 7-4v-1.822c-.396.37-.842.688-1.306.953-1.532.875-3.548 1.369-5.694 1.369s-4.162-.494-5.694-1.37A7.009 7.009 0 0 1 3 13.179Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden sm:hidden md:hidden lg:block">Bonus</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
}
