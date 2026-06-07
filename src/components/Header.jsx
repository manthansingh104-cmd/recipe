


import chefLogo from "../assets/chef-logo.png";
export default function Header() {
  return (
    <header>
      <img src={chefLogo} alt="Chef Claude logo" />
      <h1>Chef Claude</h1>
    </header>
  );
}