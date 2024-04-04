namespace backend.Helpers;

public class ValidationHelper
{
    public static bool IsPasswordValid(string password)
    {
        // Check is password is null
        if (string.IsNullOrEmpty(password)) return false;
        
        // Check if password is less than 8 characters
        if (password.Length < 8) return false;
        
        // Check if the password does not contain uppercase, lowercase, or digit 
        if (!password.Any(char.IsUpper) || !password.Any(char.IsLower) || !password.Any(char.IsDigit)) return false;
        
        // Check if the password has a special character
        if (!HasSpecialChar(password)) return false;
        
        return true;
    }

    private static bool HasSpecialChar(string input)
    {
        const string specialChar = @"\|!#$%&/()=?»«@£§€{}.-;\'<>_,\";

        return specialChar.Any(character => input.Contains(character));
    }
}