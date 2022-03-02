import Axios from 'axios';
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import Button from './Button';
import { Form, FormField, FormInputFuncProps } from './form';
import ErrorMessage from './ErrorMessage';

export default function AddBloodSugar({ isOpen, onClose }) {
  const [apiError, setApiError] = useState<string>();

  function onSubmit(val: Record<string, any>) {
    Axios.post('/api/diabetes/me/logs/sugar-level/', val)
      .then(() => {
        onClose();
      })
      .catch((e) => {
        setApiError(e);
      });
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className="z-50 inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md"
            >
              <Form
                model={{ type: 'BEFORE_MEAL', quantity: 1 }}
                onSubmit={onSubmit}
              >
                <div className="p-6">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Add Blood Sugar
                  </Dialog.Title>

                  <div className="pt-6 mt-2 space-y-5">
                    <FormField name="type" label="Time" required>
                      {({ errors, label, ...props }: FormInputFuncProps) => (
                        <div>
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700">{label}</label>
                          <select
                            id="type" {...props}
                            className="appearance-none shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            <option value="BEFORE_MEAL">Before Meal</option>
                            <option value="After_MEAL">After Meal</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors && <p className="text-xs mt-1.5 text-red-600">{errors.message}</p>}
                        </div>
                      )}
                    </FormField>

                    <FormField name="level" label="Level (mg/dL)" required>
                      {({ errors, label, ...props }: FormInputFuncProps) => (
                        <div>
                          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">{label}</label>
                          <input
                            id="quantity" type="number" min={0.25} max={100} {...props}
                            className="appearance-none shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                          />
                          {errors && <p className="text-xs mt-1.5 text-red-600">{errors.message}</p>}
                        </div>
                      )}
                    </FormField>

                    <FormField name="note" label="Note">
                      {({ errors, label, ...props }: FormInputFuncProps) => (
                        <div>
                          <label htmlFor="note" className="block text-sm font-medium text-gray-700">{label}</label>
                          <textarea
                            id="note" {...props}
                            className="appearance-none shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                          />
                          {errors && <p className="text-xs mt-1.5 text-red-600">{errors.message}</p>}
                        </div>
                      )}
                    </FormField>

                    {apiError && <ErrorMessage error={apiError} />}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse space-x-2 space-x-reverse">
                  <Button type="submit">Submit</Button>
                  <Button type="button" kind="secondary" onClick={onClose}>Close</Button>
                </div>
              </Form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
