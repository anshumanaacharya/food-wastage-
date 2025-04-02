document.addEventListener('DOMContentLoaded', () => {
    // Simulated data for demonstration purposes
    const statistics = {
        totalDonationsReceived: 0,
        totalDonationsMade: 0,
        totalMessagesReceived: 0,
        totalFoodNotReceived: 0,
        totalDonationsRejected: 0
    };

    // Update the statistics on the dashboard
    document.getElementById('total-donations-received').textContent = statistics.totalDonationsReceived;
    document.getElementById('total-donations-made').textContent = statistics.totalDonationsMade;
    document.getElementById('total-messages-received').textContent = statistics.totalMessagesReceived;
    document.getElementById('total-food-not-received').textContent = statistics.totalFoodNotReceived;
    document.getElementById('total-donations-rejected').textContent = statistics.totalDonationsRejected;
});
