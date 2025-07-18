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
            padding: "15px 20px",
            backgroundColor: "#1e3a64ff",
            borderBottom: "1px solid #d9d9d9",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: "bold", color: "white", fontFamily:'sans-serif', fontSize: '24px' }}>Samit Shrestha</div>
          {/* right side  */}
          <Flex gap={30} style={{ alignItems: "center" }}>
            {token ? (
              <>
                <Link to="/" style={{ color: "white",}}>Home</Link>
                <Link to="/profile" style={{ color: "white",}}>Profile</Link>
                <Link to="/complain" style={{ color: "white",}}>Complain</Link>
                <Button type="primary" onClick={handleLogout} style={{ color: "white",}}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ color: "white",}}>Login</Link>
                <Link to="/signup" style={{ color: "white",}}>SignUp</Link>
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
