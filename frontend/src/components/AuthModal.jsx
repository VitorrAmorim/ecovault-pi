import { LogIn, UserPlus, X } from "lucide-react";

import api from "../utils/api";

import { toast } from "sonner";

import { useState } from "react";

const AuthModal = ({ open, onOpenChange, defaultTab = "login" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setError("");
    setUserLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegisterChange = (e) => {
    setError("");
    setUserRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const login = async () => {
    if (!userLogin.email || !userLogin.password) {
      return setError("Preencha todos os campos.");
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", userLogin);

      toast.success("Login realizado com sucesso!", "success");

      const token = response.data.token;

      localStorage.setItem(
        "token",
        JSON.stringify({
          token,
          name: response.data.name,
          email: userLogin.email,
        }),
      );

      onOpenChange(false);
    } catch (err) {
      const msgText =
        err.response?.data?.message || "Ocorreu um erro inesperado!";

      setError(msgText);

      return toast.error(msgText);
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    if (!userRegister.name || !userRegister.email || !userRegister.password) {
      return setError("Preencha todos os campos.");
    }

    if (userRegister.password.length < 6) {
      return setError("A senha deve ter no mínimo 6 caracteres.");
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/register", userRegister);

      const token = response.data.token;

      localStorage.setItem(
        "token",
        JSON.stringify({
          token,
          name: response.data.name,
          email: userRegister.email,
        }),
      );

      toast.success("Conta criada com sucesso!", "success");

      onOpenChange(false);
    } catch (err) {
      const msgText =
        err.response?.data?.message || "Ocorreu um erro inesperado!";

      setError(msgText);

      return toast.error(msgText);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-101 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      <div className="relative w-full sm:max-w-100 mx-4 bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="px-6 pt-6 pb-2 text-center">
          <h2 className="font-display text-xl font-semibold text-foreground">
            {activeTab === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
          </h2>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-2 mx-6 mb-4 bg-muted/50 rounded-xl p-1">
            <button
              onClick={() => handleTabChange("login")}
              className={`rounded-lg text-sm py-1.5 cursor-pointer transition-all ${
                activeTab === "login"
                  ? "bg-card text-primary shadow-sm font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => handleTabChange("register")}
              className={`rounded-lg text-sm py-1.5 cursor-pointer transition-all ${
                activeTab === "register"
                  ? "bg-card text-primary shadow-sm font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Cadastrar
            </button>
          </div>

          {/* Login */}
          {activeTab === "login" && (
            <div className="px-6 pb-6">
              <div className="space-y-4">
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-muted-foreground text-xs uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userLogin.email}
                    onChange={handleLoginChange}
                    placeholder="seu@email.com"
                    className="bg-background border border-input rounded-xl h-11 px-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-muted-foreground text-xs uppercase tracking-wide">
                    Senha
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={userLogin.password}
                    onChange={handleLoginChange}
                    onKeyDown={(e) => e.key === "Enter" && login()}
                    placeholder="••••••"
                    className="bg-background border border-input rounded-xl h-11 px-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                {error && (
                  <p className="text-destructive text-xs text-center">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={login}
                  disabled={loading}
                  className="w-full h-11 rounded-xl cursor-pointer font-display font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {loading ? "Entrando..." : "Entrar"}
                </button>
              </div>
            </div>
          )}

          {/* Register */}
          {activeTab === "register" && (
            <div className="px-6 pb-6">
              <div className="space-y-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-muted-foreground text-xs uppercase tracking-wide">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userRegister.name}
                    onChange={handleRegisterChange}
                    placeholder="Seu nome"
                    className="bg-background border border-input rounded-xl h-11 px-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-muted-foreground text-xs uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userRegister.email}
                    onChange={handleRegisterChange}
                    placeholder="seu@email.com"
                    className="bg-background border border-input rounded-xl h-11 px-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-muted-foreground text-xs uppercase tracking-wide">
                    Senha
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={userRegister.password}
                    onChange={handleRegisterChange}
                    onKeyDown={(e) => e.key === "Enter" && register()}
                    placeholder="Mínimo 6 caracteres"
                    className="bg-background border border-input rounded-xl h-11 px-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                {error && (
                  <p className="text-destructive text-xs text-center">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={register}
                  disabled={loading}
                  className="w-full h-11 rounded-xl cursor-pointer font-display font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  {loading ? "Criando conta..." : "Criar conta"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
