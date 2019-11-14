/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { webpack as typescriptWebpack, WebpackEnvironment } from '@dolittle/typescript.webpack';
import { Configuration } from "webpack";

const aureliaPlugin = require("aurelia-webpack-plugin");

export function webpack(dirname: string, settingsCallback?: (config: Configuration) => void) {
    return (env: WebpackEnvironment = {}) => {
        let config = typescriptWebpack(dirname, _ => {
            _.entry = {
                app: ['aurelia-bootstrapper']
            };
            _.plugins!.push(new aureliaPlugin.AureliaPlugin(),
                new aureliaPlugin.ModuleDependenciesPlugin({
                    'aurelia-testing': ['./compile-spy', './view-spy']
                }));
            if (typeof settingsCallback === 'function') settingsCallback(_);
        });
        
        return config;
    }
}