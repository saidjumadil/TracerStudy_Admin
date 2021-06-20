export const message = (session, nama_notif: string, type: string, message: string) => {
  session.flash({
    [nama_notif]: {
      type: type,
      message: message,
    },
  })
}
