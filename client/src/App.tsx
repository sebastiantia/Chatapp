import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./App.scss";
import { Register } from "./pages/register";
import { ApolloProv } from "./ApolloProvider";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/Home/Home";
import { AuthProvider } from "./context/auth";
import { MessageProvider } from "./context/message";
import { ProtectedRoute } from "./util/ProtectedRoute";
import { UnprotectedRoute } from "./util/UnprotectedRoute";

function App() {
  return (
    <ApolloProv>
      <AuthProvider>
        <MessageProvider>
        <BrowserRouter>
          <Container className="pt-5">
            <Routes>
              <Route
                path="/"
                element={
                  <UnprotectedRoute>
                    <Home />
                  </UnprotectedRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <ProtectedRoute>
                    <Register />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <ProtectedRoute>
                    <Login />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Container>
        </BrowserRouter>
        </MessageProvider>
      </AuthProvider>
    </ApolloProv>
  );
}

export default App;
