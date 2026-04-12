import { RouterProvider } from "react-router-dom";
import routes from "./app.routes.jsx";
import { AuthProvider } from "./features/auth/services/auth.context.jsx";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}
