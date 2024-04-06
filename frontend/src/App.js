import Customers from "./components/Customers";
import Drivers from "./components/Driver";
import Vehicle from "./components/Vehicle";

function App() {
  return (
    <div className="App">
        <Customers />
        <Drivers />
        <Vehicle />
        <Location />
    </div>
  );
}

export default App;
