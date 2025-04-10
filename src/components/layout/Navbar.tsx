import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useAppDispatch, useAppSelector } from "../../hooks/use-redux";
import { logout } from "../../store/slices/authSlice";
import { toggleTheme } from "../../store/slices/themeSlice";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Home, Moon, Sun, User, LogOut, Menu } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">SocialFeed</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/">
                <Button variant="ghost" className="cursor-pointer" size="sm">
                  <Home className="mr-2 h-4 w-4 cursor-pointer" /> Home
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  <User className="mr-2 h-4 w-4" /> Profile
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => dispatch(toggleTheme())}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profilePicture} alt={user?.username} />
                      <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.username}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full flex cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background">
          <nav className="flex flex-col space-y-2">
            {isAuthenticated ? (
              <>
                <Link to="/">
                  <Button variant="ghost" className="w-full justify-start">
                    <Home className="mr-2 h-4 w-4" /> Home
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => dispatch(toggleTheme())}
                >
                  {isDarkMode ? (
                    <><Sun className="mr-2 h-4 w-4" /> Light Mode</>
                  ) : (
                    <><Moon className="mr-2 h-4 w-4" /> Dark Mode</>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <Link to="/login" className="w-full">
                <Button className="w-full">Login</Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
