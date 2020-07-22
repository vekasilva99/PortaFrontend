import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { GET_ORDERS } from "../helpers/graphql/queries/index";
import { useQuery } from "@apollo/react-hooks";
import { useSubscription } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./Spinner";
import { NOTIFICATION_ADDED_SUSCRIPTION } from "../helpers/graphql/subscriptions/index";
import { ACCEPT_ORDER } from "../helpers/graphql/mutations/index";
import { useAlert } from "react-alert";

export default function Pedido(props) {
  const [sidebar, setSidebar] = React.useState(false);
  const alert = useAlert();
  const { data, error, loading, subscribeToMore } = useQuery(GET_ORDERS, {
    fetchPolicy: "network-only",
  });

  const [
    acceptOrder,
    { data: dataO, error: errorO, loading: loadingO },
  ] = useMutation(ACCEPT_ORDER);

  const { _id, role, name, lastName, available } = useSelector((state) => ({
    ...state.User,
  }));

  const dispatch = useDispatch();

  const accept = async (e, id) => {
    const orden = id;

    const { data: dataO } = await acceptOrder({
      variables: {
        orderId: orden.toString(),
        repartidor: _id.toString(),
      },
    });

    if (dataO && dataO.acceptOrder) {
      console.log("before dispatch");
      dispatch({
        type: "UPDATE_USER",
        payload: {
          currentOrder: dataO.acceptOrder,
        },
      });
      console.log("after dispatch");
    }
    window.location.reload(false);
  };

  // useEffect(() => {
  //   if (dataO && dataO.acceptOrder) {
  //     console.log("before dispatch");
  //     dispatch({
  //       type: "UPDATE_USER",
  //       payload: {
  //         currentOrder: dataO.acceptOrder,
  //       },
  //     });
  //     console.log("after dispatch");
  //   }
  // }, [dataO, dispatch]);

  React.useEffect(() => {
    const unsubscription = subscribeToMore({
      document: NOTIFICATION_ADDED_SUSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newOrder = subscriptionData.data.notificationAdded;

        if (!prev.orders.find((msg) => msg._id === newOrder._id)) {
          const res = Object.assign({}, prev, {
            orders: [newOrder, ...prev.orders],
          });
          alert.show(
            "NUEVO PEDIDO POR " + newOrder.price.toString() + " DOLARES"
          );

          return res;
        } else {
          console.log("la orden de abajo fue aceptada");
          console.log(newOrder);
          console.log("prev abajo");
          console.log(prev);
          const index = prev.orders.map((e) => e._id).indexOf(newOrder._id);
          //const index = prev.orders.indexOf({...newOrder, status:"Picking up package"});
          console.log(index);
          if (index > -1) {
            prev.orders.splice(index, 1);
          }
          return prev;
        }
      },
    });
    return () => {
      unsubscription();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlingSidebar = (e) => {
    setSidebar(!sidebar);
  };

  if (error) return `Error ${error.message}`;

  return (
    <StyledPedido loading={loading}>
      {loading ? (
        <Spinner />
      ) : (
        data.orders.map((order) => (
          <div key={order._id} className="order">
            <div className="textb">
              <h2>Pedido</h2>
              <h4>Origen</h4>
              <h3>{order.deliver}</h3>
              <h4>Destino</h4>
              <h3>{order.pickUp}</h3>
            </div>
            <button
              className="next"
              value={order._id}
              onClick={() => {
                accept(Event, order._id);
                props.handleChangeChk();
              }}
            >
              <img src="/nextred.png" alt="Next" className="nextbut" />
            </button>
          </div>
        ))
      )}
    </StyledPedido>
  );
}
const Animation = keyframes`
from {
  opacity:0;
  transform: translateX(-100%);
}

`;
const StyledPedido = styled.nav`
  margin: 0;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) => (props.loading ? "center" : "start")};
  height: 40vh;
  overflow-x: hidden;
  overflow-y: auto;

  .order {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-self: center;
    align-self: center;
    animation: ${Animation} 1s ease-in-out;
    background: transparent;
    z-index: 5;
    height: fit-content;
    margin-bottom:0.5em;
 
  }

  .textb {
    padding: 0;
    width: 100%
    background: transparent;
    height: max-content;
    margin-top: 0;
    border-bottom: 1px solid #ef0023;
    width: 100%;
    padding-bottom:0.5em;
    
  }
  .next {
    display: flex;
    align-self: center;
    justify-self: center;
    height: fit-content;
    border: solid transparent;
    background: transparent;

  }
  .nextbut {
    border: solid transparent;
    display: flex;
    align-items: center;
  }

  @media only screen and (min-width: 735px) {
    .textb {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

      h2 {
        font-size: 20px;
        font-weight: 400;
        margin: 0;
        margin-bottom: 5px;
      }
      h3 {
        font-size: 15px;
        font-weight: 300;
        margin: 0;
        margin-left: 10px;
      }
      h4 {
        font-size: 10px;
        font-weight: 200;
        margin: 0;
        margin-left: 10px;
      }
    }
    .order {
      width: 80%;
    }
    .next {
    }
    .nextbut {
      height: 30px;
    }
  }
  @media only screen and (max-width: 734px) {
    .textb {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

      h2 {
        font-size: 20px;
        font-weight: 400;
        margin: 0;
        margin-bottom: 5px;
      }
      h3 {
        font-size: 15px;
        font-weight: 300;
        margin: 0;
        margin-left: 10px;
      }
      h4 {
        font-size: 10px;
        font-weight: 200;
        margin: 0;
        margin-left: 10px;
      }
    }
    .order {
      width: 80%;
    }
    .next {
    }
    .nextbut {
      height: 30px;
    }
  }
`;
