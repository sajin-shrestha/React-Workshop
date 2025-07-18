import { Flex, Button } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import React from "react";

const RootLayout = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <header>
        {/* left side one */}
        <Flex
          justify="space-between"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 20px",
            backgroundColor: "#f0f2f5",
            borderBottom: "1px solid #d9d9d9",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: "bold" }}>Samit Shrestha</div>
          {/* right side  */}
          <Flex gap={20} style={{ alignItems: "center" }}>
            {token ? (
              <>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/complain">Complain</Link>
                <Button type="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>
              </>
            )}
            {/* <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>SignUp</Link>
                <div>Logout</div>
         */}
          </Flex>
        </Flex>
      </header>
      <main>
        {/* for rendering other react pages defined inside root layout */}
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
