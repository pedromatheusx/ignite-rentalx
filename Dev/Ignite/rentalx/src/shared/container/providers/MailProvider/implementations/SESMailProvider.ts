import aws from "aws-sdk"
import nodemailer, { Transporter } from "nodemailer";

import { injectable } from "tsyringe";
import Handlebars from "handlebars";
import fs from "fs";
import { IMailProvider } from "../IMailProvider";


@injectable()
class SESMailProvider implements IMailProvider {
    private client: Transporter
    constructor() {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: "2010-12-01",
                region: process.env.AWS_REGION
            })
        })
    }

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {

        const templateFileContent = fs.readFileSync(path).toString("utf-8")

        const templateParse = Handlebars.compile(templateFileContent)

        const templateHTML = templateParse(variables)
        await this.client.sendMail({
            to,
            from: "Rentx <suporte@nextpeople.com.br>",
            subject,
            html: templateHTML
        })


    }



}

export { SESMailProvider }