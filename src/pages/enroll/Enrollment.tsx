'use client'

import { useState, useMemo } from 'react'
import DashboardHeader from '@/components/dashboard/Header'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import EnrollmentHeader from '@/components/enrollment/EnrollmentHeader'
import EnrollmentGrid from '@/components/enrollment/EnrollmentGrid'
import DeleteConfirmationModal from '@/components/enrollment/DeleteConfirmationModal'
import DetectionHistoryModal from '@/components/enrollment/DetectionHistoryModal'
import EnrollmentWizard from '@/components/enrollment/EnrollmentWizard'
import { ENROLLED_PERSONS } from '@/lib/data/enrollments'
import type { EnrolledPerson } from '@/lib/data/enrollments'

export default function EnrollmentPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [personToDelete, setPersonToDelete] = useState<EnrolledPerson | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  const [personForHistory, setPersonForHistory] = useState<EnrolledPerson | null>(null)
  const [enrollmentWizardOpen, setEnrollmentWizardOpen] = useState(false)
  const itemsPerPage = 8

  // Filter persons based on search query
  const filteredPersons = useMemo(() => {
    return ENROLLED_PERSONS.filter((person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const handleAddPerson = () => {
    setEnrollmentWizardOpen(true)
  }

  const handleEdit = (id: string) => {
    console.log('Edit person:', id)
  }

  const handleViewHistory = (id: string) => {
    const person = ENROLLED_PERSONS.find((p) => p.id === id)
    if (person) {
      setPersonForHistory(person)
      setHistoryModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    const person = ENROLLED_PERSONS.find((p) => p.id === id)
    if (person) {
      setPersonToDelete(person)
      setDeleteModalOpen(true)
    }
  }

  const handleConfirmDelete = async () => {
    if (!personToDelete) return
    setIsDeleting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 100))
      console.log('Delete confirmed for:', personToDelete.id)
      setDeleteModalOpen(false)
      setPersonToDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancelDelete = () => {
    setDeleteModalOpen(false)
    setPersonToDelete(null)
  }

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  const handleNext = () => {
    const totalPages = Math.ceil(filteredPersons.length / itemsPerPage)
    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
  }

  return (
    <div style={{ backgroundColor: '#0B1020', color: '#E5E7EB' }} className="min-h-screen">
      <DashboardHeader />
      <DashboardSidebar />

      {/* Main Content */}
      <main className="md:ml-64 pt-12 p-8" style={{ backgroundColor: '#0B1020' }}>
        <EnrollmentHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddPerson={handleAddPerson}
        />
        <EnrollmentGrid
          persons={filteredPersons}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onEdit={handleEdit}
          onViewHistory={handleViewHistory}
          onDelete={handleDelete}
        />
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        person={personToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />

      {/* Detection History Modal */}
      <DetectionHistoryModal
        isOpen={historyModalOpen}
        personName={personForHistory?.name || null}
        personId={personForHistory?.id || null}
        onClose={() => setHistoryModalOpen(false)}
      />

      {/* Enrollment Wizard Modal */}
      <EnrollmentWizard
        isOpen={enrollmentWizardOpen}
        onClose={() => setEnrollmentWizardOpen(false)}
        onComplete={(data) => {
          console.log('Enrollment Step 1 completed:', data)
          // Step 2 will be implemented next
        }}
      />
    </div>
  )
}
