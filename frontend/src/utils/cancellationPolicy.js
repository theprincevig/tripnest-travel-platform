export const getCancellationPolicy = (reservation) => {
    if (!reservation) {
        return {
            hasCancellationFee: false,
            cancellationFee: 0,
            refundAmount: 0,
            hoursBeforeCheckIn: null,
        };
    }

    const now = new Date();

    const hoursBeforeCheckIn =
        (new Date(reservation.checkIn) - now) /
        (1000 * 60 * 60);

    const hasCancellationFee =
        hoursBeforeCheckIn <= 24;

    const cancellationFee = hasCancellationFee
        ? reservation.totalPrice * 0.10
        : 0;

    const refundAmount =
        reservation.totalPrice - cancellationFee;

    return {
        hasCancellationFee,
        cancellationFee,
        refundAmount,
        hoursBeforeCheckIn,
    };
};