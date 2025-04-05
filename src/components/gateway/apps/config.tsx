import React from 'react'

interface ConfigStep {
    number: number;
    title: string;
    isActive: boolean;
    isCompleted: boolean;
}

export default function AppConfig() {
    const [currentStep, setCurrentStep] = React.useState(1)
    
    const steps: ConfigStep[] = [
        { number: 1, title: 'Select Application', isActive: currentStep === 1, isCompleted: currentStep > 1 },
        { number: 2, title: 'Configure Settings', isActive: currentStep === 2, isCompleted: currentStep > 2 },
        { number: 3, title: 'Review & Deploy', isActive: currentStep === 3, isCompleted: false },
    ]

    return (
        <div className='w-full flex flex-col space-y-8'>
            {/* Progress Steps */}
            <div className='flex justify-between items-center'>
                {steps.map((step, index) => (
                    <React.Fragment key={step.number}>
                        <div className='flex items-center'>
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center
                                ${step.isCompleted 
                                    ? 'bg-green-500 text-white' 
                                    : step.isActive 
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }
                            `}>
                                {step.number}
                            </div>
                            <span className='ml-2 text-sm font-medium hidden md:block'>
                                {step.title}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className='flex-1 mx-4 h-0.5 bg-gray-200' />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Configuration Content */}
            <div className='w-full bg-white rounded-lg border p-6'>
                {/* Content changes based on currentStep */}
                {currentStep === 1 && <SelectionStep />}
                {currentStep === 2 && <ConfigurationStep />}
                {currentStep === 3 && <ReviewStep />}
            </div>

            {/* Navigation Buttons */}
            <div className='flex justify-between'>
                <button 
                    className='px-4 py-2 border rounded-md hover:bg-gray-50'
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                >
                    Previous
                </button>
                <button 
                    className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                    onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                    disabled={currentStep === 3}
                >
                    {currentStep === 3 ? 'Deploy' : 'Next'}
                </button>
            </div>
        </div>
    )
}

function SelectionStep() {
    return (
        <div className='flex flex-col space-y-4'>
            <h2 className='text-xl font-semibold'>Select Application</h2>
            {/* Add your selection content here */}
        </div>
    )
}

function ConfigurationStep() {
    return (
        <div className='flex flex-col space-y-4'>
            <h2 className='text-xl font-semibold'>Configure Settings</h2>
            {/* Add your configuration form here */}
        </div>
    )
}

function ReviewStep() {
    return (
        <div className='flex flex-col space-y-4'>
            <h2 className='text-xl font-semibold'>Review Configuration</h2>
            {/* Add your review content here */}
        </div>
    )
}