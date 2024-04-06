import Customers from "./components/Customers";
import Drivers from "./components/Driver";
import Vehicle from "./components/Vehicle";
import Location from "./components/Location";
import Itinerary from "./components/Itinerary";

function App() {
  return (
    <div className="App">
        <Customers />
        <Drivers />
        <Vehicle />
        <Location />
        <Itinerary />
    </div>
  );
}

export default App;
