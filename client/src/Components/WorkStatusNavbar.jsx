import React from "react";

export default function WorkStatusNavbar({
  statusConfirmed,
  handleChangeStatus,
}) {

  return (
    <div className="navStatus">
      <nav>
        <ul>
          <li
            className={statusConfirmed ? "active" : ""}
            onClick={() => {
              handleChangeStatus(true);
            }}
          >
            Confirmados
          </li>
          <li
            className={!statusConfirmed ? "active" : ""}
            onClick={() => {
              handleChangeStatus(false);
            }}
          >
            Por confirmar
          </li>
        </ul>
      </nav>
    </div>
  );
}
