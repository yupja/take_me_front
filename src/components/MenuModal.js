import React from "react";
import "../public/css/menuStyle.css"

const MenuModal = (props) =>{
    const { open, close, header } = props;

    return (
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>{props.children}</main>
          </section>
        ) : null}
      </div>
    );
}

export default MenuModal;