import c from 'classnames';
import React from 'react';
import {
  ChartBarIcon, HomeIcon, MenuIcon, NewspaperIcon, UsersIcon, XIcon,
} from '@heroicons/react/outline';
import { Popover } from '@headlessui/react';

import ProfileDropDown from '../components/ProfileDropDown';
import LinkTo from '../components/LinkTo';

const navigation = [
  {
    name: 'Home', href: '/', icon: HomeIcon, matchExact: true,
  },
  { name: 'News', href: '/news', icon: NewspaperIcon },
  { name: 'People', href: '/people', icon: UsersIcon },
  { name: 'Stocks', href: '/stocks', icon: ChartBarIcon },
];

export default function DashboardLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Popover
        as="header"
        className={({ open }: { open: boolean }) => c(
          open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
          'bg-white shadow lg:static lg:overflow-y-visible border-b border-gray-200',
        )}
      >
        {/* eslint-disable-next-line react/no-unused-prop-types */}
        {({ open }: { open: boolean }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between items-center space-x-2 lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static lg:col-span-3">
                  <div className="flex-shrink-0 flex items-center">
                    <a href="#">
                      <img
                        className="block h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=rose&shade=500"
                        alt="Workflow"
                      />
                    </a>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 lg:col-span-7" />
                <div className="flex lg:items-center lg:justify-end lg:col-span-2 py-4">
                  <ProfileDropDown/>
                </div>
                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden py-4">
                  {/* Mobile menu button */}
                  <Popover.Button
                    className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  >
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={!item ? 'page' : undefined}
                    className={c(
                      !item ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
                      'block rounded-md py-2 px-3 text-base font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>

      <div className="py-10 bg-gray-100">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          {false && (
            <div className="hidden lg:block lg:col-span-3">
              <nav aria-label="Sidebar" className="sticky top-4 divide-y divide-gray-300">
                <div className="pb-8 space-y-1">
                  {navigation.map((item) => (
                    <LinkTo
                      key={item.name}
                      href={item.href}
                      matchExact={item.matchExact || false}
                      passHref
                    >
                      {(active: boolean) => (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a
                          className={c(
                            'group flex items-center px-3 py-2 text-sm font-medium rounded-md',
                            active ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50',
                          )}
                        >
                          <item.icon
                            className={c(
                              'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
                              active ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            )}
                            aria-hidden="true"
                          />
                          <span className="truncate">{item.name}</span>
                        </a>
                      )}
                    </LinkTo>
                  ))}
                </div>
              </nav>
            </div>
          )}
          <main className="lg:col-span-12">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
