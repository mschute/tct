namespace DefaultNamespace;

public class FormHelpers
{
    const getType = (str) => {
        if (str === "dob"){
            return "date"
        }
        return "text"
    }

    const getDisabled = (str) => {
        if (str.includes("Id")){
            return true
        }
        return false
    }
}