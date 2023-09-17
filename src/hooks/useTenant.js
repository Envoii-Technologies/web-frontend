import { useContext } from "react";
import { TenantContext } from "../context";

export const useTenant = () => {
    return useContext(TenantContext);
}
