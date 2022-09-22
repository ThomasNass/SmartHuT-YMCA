
export const SignOutButton = (props) => {

    // Replace logic with react router it will be better
    const SignOutNow = async (e) => {
        e.preventDefault();
        try {
            window.location = "https://localhost:5000/user/signout"
            window.location.reload();
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div >
            <button onClick={SignOutNow}>SignOut</button>
        </div>
    );
}