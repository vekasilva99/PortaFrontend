import React from "react";
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
import Moment from "moment";

export default function Deliv(props) {
  const [sidebar, setSidebar] = React.useState(false);

  const { data, error, loading, subscribeToMore } = useQuery(GET_ORDERS, {
    fetchPolicy: "network-only",
  });

  const [
    acceptOrder,
    { data: dataO, error: errorO, loading: loadingO },
  ] = useMutation(ACCEPT_ORDER);

  const { _id, role, name, lastName, available, orders } = useSelector(
    (state) => ({
      ...state.User,
    })
  );

  const dispatch = useDispatch();

  const accept = async (e, id) => {
    const orden = id;
    console.log(orden);
    console.log("id rep " + _id);

    const { dataO } = await acceptOrder({
      variables: {
        orderId: orden.toString(),
        repartidor: _id.toString(),
      },
    });
    if (dataO && dataO.acceptOrder) {
      dispatch({
        type: "UPDATE_USER",
        payload: {
          available: false,
          currentOrder: dataO.acceptOrder,
        },
      });
    }
  };

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
          return res;
        } else return prev;
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

  const getMoney = (orders) => {
    let content = 0;
    for (let item of orders) {
      content = content + item.price;
    }

    return content;
  };

  if (error) return `Error ${error.message}`;

  return (
    <StyledDeliv loading={loading}>
      <>
        {loading ? (
          <div className="spinner">
            <Spinner />
          </div>
        ) : (
          <>
            {orders.length > 0 ? (
              <div className="collected">
                <h3>You have made: </h3>
                <h3> ${getMoney(orders).toString()} USD</h3>
              </div>
            ) : null}
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order._id} className="order">
                  <div className="textb">
                    <h2>Pedido</h2>
                    <h4>Origen</h4>
                    <h3>{order.deliver}</h3>
                    <h4>Destino</h4>
                    <h3>{order.pickUp}</h3>

                    {order.repartidor ? (
                      <div>
                        <h4>Usuario</h4>
                        <h3>
                          {order.user.name} {order.user.lastName}
                        </h3>
                      </div>
                    ) : null}
                    <h4>Precio</h4>
                    <h3>${order.price.toString()}</h3>
                    <h4>Fecha</h4>
                    <h3>
                      {Moment(order.createdAt.toString()).format("DD-MM-YYYY")}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty">
                <img src="/emptyrojo.png" alt="compass" />
                <h2>Usted no ha realizado ningun Viaje</h2>
              </div>
            )}
          </>
        )}
      </>
    </StyledDeliv>
  );
}
const Animation = keyframes`
from {
  opacity:0;
  transform: translateX(-100%);
}

`;
const StyledDeliv = styled.nav`
  margin: 0;
  padding: 0;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) => (props.loading ? "center" : "flex-start")};
  margin-top: ${(props) => (props.loading ? "0" : "60px")};
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  .collected {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0.5rem;

    h3 {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-size: 20px;
    }
  }

  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .order {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-self: left;
    align-self: center;
    animation: ${Animation} 1s ease-in-out;
    background: transparent;
    z-index: 5;
    height: fit-content;
    margin-bottom: 0.5em;
  }

  .empty {
    width: 20vw;
    height: 40vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    left: 0;
    padding-left: 1rem;
    padding-right: 1rem;
    h2 {
      font-weight: 300;
      color: #202124;
      font-size: 20px;
      letter-spacing: 2px;
      margin-bottom: 40px;
    }
    img {
      width: 5vw;
      margin-bottom: 2vh;
    }
  }

  .textb {
    padding: 0;
    width: 100%;
    background: #ee462f;
    height: max-content;
    border-radius: 20px;
    margin-top: 0;
    border: 1px solid #ee462f;
    width: 100%;
    padding: 0.5em;
  }

  @media only screen and (min-width: 735px) {
    .empty {
      width: 100%;
      height: 100%;
    }
    .textb {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

      h2 {
        font-size: 20px;
        font-weight: 400;
        color: #fafafa;
        margin: 0;
        margin-bottom: 5px;
      }
      h3 {
        font-size: 15px;
        font-weight: 300;
        margin: 0;
        color: #fafafa;
        margin-left: 10px;
      }
      h4 {
        font-size: 10px;
        font-weight: 200;
        color: #fafafa;
        margin: 0;
        margin-left: 10px;
      }
    }
    .order {
      width: 60%;
    }
    .next {
    }
    .nextbut {
      height: 30px;
    }
  }
  @media only screen and (min-width: 735px) (max-width: 1069px) {
    .empty {
      width: 100%;
      height: 100%;
      img {
        width: 15vw;
        margin-bottom: 2vh;
      }
    }
  }
  @media only screen and (max-width: 734px) {
    .empty {
      width: 100%;
      height: 100%;
      img {
        width: 15vw;
        margin-bottom: 2vh;
      }
    }

    .textb {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

      h2 {
        font-size: 20px;
        font-weight: 400;
        margin: 0;
        color: #fafafa;
        margin-bottom: 5px;
      }
      h3 {
        font-size: 15px;
        font-weight: 300;
        margin: 0;
        color: #fafafa;
        margin-left: 10px;
      }
      h4 {
        font-size: 10px;
        font-weight: 200;
        margin: 0;
        color: #fafafa;
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
