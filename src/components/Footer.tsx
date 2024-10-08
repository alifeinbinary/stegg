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

import { useTranslation } from "react-i18next";

/**
 * A simple footer component displaying the copyright and license information.
 *
 * @returns The footer component.
 */
const Footer: React.FC = () => {

    const { t } = useTranslation();

    return (
        <footer className="bg-white dark:bg-gray-900 text-center">
            <div className="mx-auto p-2 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    &copy; 2024 <a className="hover:underline" href="https://www.alifeinbinary.com/">Andrew Halliwell</a>. {t('footer.rights')}. <br />{t('footer.license')} <a href="https://choosealicense.com/licenses/gpl-3.0/" target="_blank" className="hover:underline">GPLv3 license</a>.
                </span>
            </div>
        </footer>
    );
};

export default Footer