import React from "react";
import { useAuthState } from "../../context/auth";
import classNames from "classnames";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "moment";

export const Message = ({ message }: any) => {
  const { user } = useAuthState();
  const sent = message.from === user.username;
  const received = !sent;

  return (
    <>
      <OverlayTrigger
        placement={sent ? "right" : "left"}
        overlay={
          <Tooltip>
            {moment(message.createdAt).format("MMMM DD, YYYY @ h:mm a")}
          </Tooltip>
        }
      >
        <div
          className={classNames("d-flex my-3", {
            "me-auto": received,
            "ms-auto": sent,
          })}
        >
          <div
            className={classNames("py-2 px-3 rounded-pill", {
              "bg-primary ": sent,

              "bg-secondary": received,
            })}
          >
            <p
              className={classNames({ "text-white": sent })}
              key={message.uuid}
            >
              {message.content}
            </p>
          </div>
        </div>
      </OverlayTrigger>
    </>
  );
};
