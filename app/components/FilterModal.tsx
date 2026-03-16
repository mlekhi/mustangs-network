'use client'

import { useEffect, useRef } from 'react'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  selectedSkills: string[]
  selectedYears: string[]
  onSkillToggle: (skill: string) => void
  onYearToggle: (year: string) => void
  onReset: () => void
}

const skills = ['Frontend', 'Backend', 'Fullstack', 'Product', 'Marketing', 'Design', 'Venture', 'Mobile']
const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']

export default function FilterModal({
  isOpen,
  onClose,
  selectedSkills,
  selectedYears,
  onSkillToggle,
  onYearToggle,
  onReset
}: FilterModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div ref={modalRef} className="fixed top-28 left-4 z-50 bg-black border border-gray-700 rounded-2xl p-2 w-80 max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-center mb-2">
        <h2 className="text-sm text-white">Filters</h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="border-t border-gray-700 mb-2"></div>

      {/* Skills Section */}
      <div className="mb-2">
        <div className="flex flex-wrap gap-1">
          {skills.map((skill) => (
            <button
              key={skill}
              onClick={() => onSkillToggle(skill)}
              className={`px-2 py-1 rounded-full text-sm border transition-colors ${
                selectedSkills.includes(skill)
                ? 'bg-white text-black'
                : 'border-gray-600 text-gray-500 hover:bg-gray-900'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-700 mb-2"></div>

      {/* Years Section */}
      <div className="mb-2">
        <div className="flex flex-wrap gap-1">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => onYearToggle(year)}
              className={`px-2 py-1 rounded-full text-sm border transition-colors ${
                selectedYears.includes(year)
                  ? 'bg-white text-black'
                  : 'border-gray-600 text-gray-500 hover:bg-gray-900'
                }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Reset button - only shown when filters are active */}
      {(selectedSkills.length > 0 || selectedYears.length > 0) && (
        <>
          <div className="border-t border-gray-700 mb-2"></div>
          <button
            onClick={onReset}
            className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Reset filters
          </button>
        </>
      )}
    </div>
  )
}
