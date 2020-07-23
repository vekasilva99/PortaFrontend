// import React from "react";
// import styled from "styled-components";
// import { NavLink, withRouter } from "react-router-dom";
// import { Redirect } from "react-router-dom";
// import { TiThMenuOutline } from "react-icons/ti";
// import { FiMail } from "react-icons/fi";
// import { FaRegUser } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";

// export default function NavbarAdmin(props) {
//   const [sidebar, setSidebar] = React.useState(false);
//   const [log, setLog] = React.useState(false);
//   const dispatch = useDispatch();

//   const logOut = (e) => {
//     console.log("log Out");
//     setLog(true);
//     console.log(log);
//   };

//   React.useEffect(() => {
//     if (log) {
//       localStorage.clear();
//       dispatch({
//         type: "LOGOUT",
//       });
//     }
//   }, [log]);

//   const handlingSidebar = (e) => {
//     setSidebar(!sidebar);
//   };

//   const { mail } = useSelector((state) => ({
//     ...state.User,
//   }));

//   let style;
//   if (sidebar) {
//     style = "close";
//   } else {
//     style = "open";
//   }
//   return (
//     <>
//       {log ? <Redirect to="/adminlogin" /> : null}
//       <div>
//         <StyledNavbar>
//           <div className="toggle">
//             <div>
//               <TiThMenuOutline
//                 onClick={() => {
//                   props.togglerSidebar();
//                   handlingSidebar();
//                 }}
//                 className={style}
//                 size="1.7rem"
//                 color="#fafafa"
//               />
//             </div>
//           </div>

//           <ul className="nav-links">
//             <button className="link" onClick={logOut}>
//               LOG OUT
//             </button>

//             <button to="/" className="link2">
//               PROFILE
//             </button>
//           </ul>
//         </StyledNavbar>
//       </div>
//     </>
//   );
// }
// const StyledNavbar = styled.nav`
//   display: flex;
//   position: fixed;
//   flex-flow: row nowrap;
//   align-items: center;
//   justify-content: flex-end;
//   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
//     Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
//   height: 8vh;
//   width: 100%;
//   top: 0;
//   left: 0;
//   background: #202124;

//   .toggle {
//     display: flex;
//     position: fixed;
//     flex-flow: row nowrap;
//     align-items: center;
//     justify-content: flex-start;
//     top: 0;
//     left: 0;
//   }
//   .open {
//     display: flex;
//     flex-flow: row nowrap;
//     align-items: left;
//     list-style: none;
//     margin-left: 22vw;
//     margin-top: 1rem;
//     cursor: pointer;
//     transform: translateX(0);
//     transition: transform 0.3s ease-out;
//     font-weight: 200;
//     &:hover {
//       color: #fafafa;
//     }
//   }

//   .close {
//     transform: translateX(-18vw);
//     display: flex;
//     font-weight: 200;
//     flex-flow: row nowrap;
//     align-items: left;
//     list-style: none;
//     margin-left: 20vw;
//     margin-top: 1rem;
//     cursor: pointer;
//     transition: transform 0.3s ease-out;
//     &:hover {
//       color: #fafafa;
//     }
//   }
//   .nav-links {
//     display: flex;
//     flex-flow: row nowrap;
//     justify-content: space-evenly;
//     align-items: center;
//     width: 20vw;
//     list-style: none;
//     margin-right: 1rem;
//   }
//   .link {
//     display: flex;
//     color: #fafafa;
//     font-weight: 600;
//     font-weight: 300;
//     font-size: 0.7em;
//     text-decoration: none;
//     padding: 0.8vw;
//     padding-left: 2vw;
//     padding-right: 2vw;
//     border: 1.5px solid #202124;
//     border-radius: 5vw;
//     cursor: pointer;
//     transition: all ease-in-out 0.3s;
//     justify-content: flex-end;
//     background: #202124;
//     z-index: 200;

//     &:hover {
//       background: #333333;
//       color: #fafafa;
//       border-color: #333333;
//     }
//     &:focus {
//       outline: none;
//     }
//   }
//   .link2 {
//     display: flex;
//     color: #fafafa;
//     font-weight: 600;
//     font-weight: 300;
//     font-size: 0.7em;
//     text-decoration: none;
//     padding: 0.8vw;
//     padding-left: 1.8vw;
//     padding-right: 1.8vw;
//     border: 1.5px solid #202124;
//     border-radius: 5vw;
//     cursor: pointer;
//     transition: all ease-in-out 0.3s;
//     justify-content: flex-end;
//     background: #202124;

//     &:hover {
//       background: #333333;
//       color: #fafafa;
//       border-color: #333333;
//     }
//     &:focus {
//       outline: none;
//     }
//   }
// `;

import React from "react";
import styled from "styled-components";
import { FiLogIn } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

export default function NavbarAdmin(props) {
  const [sidebar, setSidebar] = React.useState(false);
  const [log, setLog] = React.useState(false);
  const dispatch = useDispatch();

  const handlingSidebar = (e) => {
    setSidebar(!sidebar);
  };

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch({
      type: "LOGOUT",
    });
    setLog(true);
  };

  let style;
  if (sidebar) {
    style = "close";
  } else {
    style = "open";
  }

  return (
    <>
      {log && <Redirect to="/" />}
      <StyledNavbarAdmin phoneR={props.phoneR}>
        <div className="fondo">
          <div className="toggle">
            <img src="/LogoAdmin.png" alt="Logo" className="logo" />
            <div>
              <h2>Porta</h2>
            </div>
          </div>
          <ul className="nav-links">
            <button onClick={logOut} className="link1" tag={Link} to="/">
              LOG OUT
            </button>
            <button onClick={props.toggle} className="link2">
              ADMIN
            </button>
            <li>
              <button onClick={logOut} className="link3">
                <FiLogIn size="2em" className="userbut" />
              </button>
            </li>
            <li>
              <button onClick={props.toggle} className="link3">
                <FiMenu size="2em" className="userbut" />
              </button>
            </li>
          </ul>
        </div>
      </StyledNavbarAdmin>
    </>
  );
}
const StyledNavbarAdmin = styled.nav`
  .fondo {
    height: 70px;
    display: flex;
    position: fixed;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    font-family: Roboto;
    width: 100%;
    top: 0;
    left: 0;
    background: #1d1d1f;
    z-index: 3500;
  }

  .toggle {
    padding: 0px;
    z-index: 5;
    display: flex;
    position: fixed;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    letter-spacing: 0.2rem;
    color: #fafafa;
    top: 0;
    left: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    z-index: 3500;
  }

  .nav-links {
    display: flex;
    padding: 0;
    margin: 0;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    list-style: none;
    z-index: 3500;
  }
  .link1 {
    display: flex;
    color: #fafafa;
    font-weight: 600;
    font-weight: 300;
    font-size: 0.7em;
    text-decoration: none;
    padding: 0.8vw;
    padding-left: 2vw;
    padding-right: 2vw;
    border: 1.5px solid #202124;
    border-radius: 5vw;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    justify-content: flex-end;
    background: #202124;
    z-index: 3500;
    &:hover {
      background: #333333;
      color: #fafafa;
      border-color: #333333;
    }
    &:focus {
      outline: none;
    }
  }

  .link2 {
    display: flex;
    color: #fafafa;
    font-weight: 600;
    font-weight: 300;
    font-size: 0.7em;
    text-decoration: none;
    padding: 0.8vw;
    padding-left: 1.8vw;
    padding-right: 1.8vw;
    border: 1.5px solid #202124;
    border-radius: 5vw;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    justify-content: flex-end;
    background: #202124;
    z-index: 3500;
    margin-left: 1rem;
    &:hover {
      background: #333333;
      color: #fafafa;
      border-color: #333333;
    }
    &:focus {
      outline: none;
    }
  }

  .link3 {
    display: none;
    color: #fafafa;
    text-decoration: none;
    border: none;
    justify-content: flex-end;
    background: transparent;
    z-index: 3500;
  }
  .userbut {
    width: 15px;
  }

  @media only screen and (min-width: 735px) {
    .fondo {
      padding-right: 1rem;
    }
    .toggle {
      height: 70px;
      padding-left: 1rem;
      font-size: 20px;
    }
    .logo {
      width: 50px;
      margin-right: 1rem;
    }
    .nav-links {
      margin-right: 1rem;
    }
  }

  @media only screen and (max-width: 734px) {
    .fondo {
      padding-right: 0;
    }
    .toggle {
      height: 70px;
      padding-left: 0.5rem;
      font-size: 15px;
    }
    .logo {
      width: 40px;
      margin-right: 0.5rem;
    }
    .link1 {
      display: none;
    }
    .link2 {
      display: none;
    }
    .link3 {
      display: block;
    }
    .userbut {
      width: 50px;
      background: none;
    }
    .nav-links {
      left-margin: 2rem;
    }
  }
`;
