import { MailtrapClient } from "mailtrap";

const TOKEN = "db81d95f623ee397cca1fd1ba6edf58c";

export const mailtrapClient = new MailtrapClient({
    token: TOKEN,
});

export const sender = {
    email: "hello@demomailtrap.com",
    name: "Mailtrap Test",
};

