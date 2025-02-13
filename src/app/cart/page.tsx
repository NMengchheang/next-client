"use client";

import Footer from "@/components/Footer";
import LoginLinks from "../LoginLinks";
import CartPage from "@/components/CartPage";
import { useEffect, useState } from "react";


export default function page() {
    return (
      <div>
        <LoginLinks />
        <CartPage />
        <Footer />
      </div>
    );
}