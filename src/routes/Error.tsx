/*
 *   Copyright (c) 2024 Andrew Halliwell

 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.

 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.

 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface RouteError {
    statusText?: string;
    message?: string;
}

const Error = () => {
    const { t } = useTranslation();
    const error = useRouteError() as RouteError;

    return (
        <div>
            <h1>{t('error.oops')}</h1>
            <p>{t('error.notFound')}</p>
            <p>
                <i>{error?.statusText || error?.message}</i>
            </p>
        </div>
    );
};

export default Error;