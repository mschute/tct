import {
    calculateTomorrow,
    formatTime,
    formatToClock,
    isFirstTwoDigitsOver24
} from "../helpers/helpers";
import "../styles/itinerary-form-style.css"
import {useState} from "react";

const ItineraryForm = ({
                           itineraryDTO,
                           handleRouteUpdate,
                           handleTripDateChange,
                           handleStartTimeChange,
                           handleEndTimeChange,
                           handleDeleteItineraryButtonClick,
                           handleStopTime,
                           handleNoteChange,
                           handleFormSubmit,
                           handlePassengerCount,
                           handleInputChange,
                           activeCustomerId,
                           jwtToken
                       }) => {

    return (
        <div className="itinerary-form">
            <form onSubmit={handleFormSubmit}>
                <table>
                    <thead>
                    <tr>
                        <th>
                            Trip Date
                        </th>
                        <th>
                            Start Time
                        </th>
                        <th>
                            End Time
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <label>
                                <input type="date" name="tripDate" value={itineraryDTO.tripDate}
                                       onChange={handleTripDateChange} disabled={false} min={calculateTomorrow()}/>
                            </label>
                        </td>
                        <td>
                            <label>
                                <input type="time" name="tripStartTime" value={itineraryDTO.tripStartTime}
                                       onChange={handleStartTimeChange} disabled={false}/>
                            </label>
                        </td>
                        <td>
                            <label>
                                <input type="time" name="tripEndTime" value={formatToClock(itineraryDTO.tripEndTime)}
                                       onChange={handleEndTimeChange} readOnly/>
                            </label>

                        </td>
                        {isFirstTwoDigitsOver24(itineraryDTO.tripEndTime) ?
                            <div className="error-message">Tour cannot go past midnight</div> : ""}
                    </tr>
                    </tbody>
                </table>
                <br/>
                <table>
                    <thead>
                    <tr>
                        <th>Itinerary Stops</th>
                        <th>Location Name</th>
                        <th>Location Address</th>
                        <th>Travel Time</th>
                        <th>Stop Over Time (Min)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {itineraryDTO.locations.map((location, index) => {
                            if (index === 0 || index === itineraryDTO.locations.length - 1) {
                                return (
                                    <tr>
                                        <td>
                                            <input type="text"
                                                   name="locationName"
                                                   value={location.stopOrders}
                                                   disabled={true}
                                            />
                                        </td>
                                        <td>
                                            <input type="text"
                                                   name="locationName"
                                                   value={location.name}
                                                   disabled={true}
                                            />
                                        </td>
                                        <td>
                                            <input type="text"
                                                   name="locationAddress"
                                                   value={location.address}
                                                   disabled={true}
                                            />
                                        </td>
                                        <td>
                                            <input type="text"
                                                   name="travelTime"
                                                   value={formatTime(location.travelTimeNextLocale)}
                                                   disabled={true}
                                            />
                                        </td>
                                        <td>
                                            <input type="text" name="stopOver"
                                                   value={location.stopOver}
                                                   disabled={true}
                                            />
                                        </td>
                                    </tr>
                                )
                            }
                            return (
                                <tr>
                                    <td>
                                        <input type="text"
                                               name="locationName"
                                               value={location.stopOrders}
                                               disabled={true}
                                        />
                                    </td>
                                    <td>
                                        <input type="text"
                                               name="locationName"
                                               value={location.name}
                                               disabled={true}
                                        />
                                    </td>
                                    <td>
                                        <input type="text"
                                               name="locationAddress"
                                               value={location.address}
                                               disabled={true}
                                        />
                                    </td>
                                    <td>
                                        <input type="text"
                                               name="travelTime"
                                               value={formatTime(location.travelTimeNextLocale)}
                                               disabled={true}
                                        />
                                    </td>
                                    <td>
                                        <input type="number"
                                               name="stopOver"
                                               value={location.stopOver}
                                               disabled={false}
                                               min="0"
                                               step="15"
                                               onChange={(event) => handleStopTime(event, index)}
                                        />
                                    </td>
                                    <td>
                                        <button className="secondary-button" onClick={(event) => {
                                            event.preventDefault();
                                            handleDeleteItineraryButtonClick(index)
                                        }}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    )}
                    </tbody>
                </table>
                <br/>
                <div className="input-group">
                    <label>Total Tour Time: </label>
                    <input type="text" name="totalTourTime" value={formatTime(itineraryDTO.totalTravelTime)}
                           disabled={true}
                           readOnly/>
                </div>
                <br/>
                <div className="input-group">
                    <label>Passenger Count: </label>
                    <input type="number" name="passengerCount" value={itineraryDTO.passengerCount}
                           min={1} max={12} step={1} onChange={(event) => handlePassengerCount(event)}/>
                </div>
                <br/>
                <div className="input-group">
                    <label>Itinerary Notes: </label>
                    <input type="text" name="itineraryNote" value={itineraryDTO.itineraryNotes} disabled={false}
                           id="itinerary-notes" onChange={handleNoteChange}/>
                    <input type="hidden" name="customerId" value={activeCustomerId}/>
                </div>
                {jwtToken !== null && !isFirstTwoDigitsOver24(itineraryDTO.tripEndTime) && itineraryDTO.tripStartTime !== '' && itineraryDTO.tripStartTime !== '' && itineraryDTO.locations.length >= 3? (
                    <button className="primary-button" type="submit">Submit
                        Itinerary</button>
                ) : (
                    <button className="disabled-button" type="submit" disabled={true}>Submit Itinerary</button>
                )}
            </form>
        </div>
    );
};

export default ItineraryForm;