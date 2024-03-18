
const getUserData = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.log('Access token not available.');
        return null;
    }

    try {
        const response = await fetch('http://localhost:8080/user/data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, //access token
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data.');
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};
