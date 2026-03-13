'use client'

import { useState, useEffect } from 'react'
import { Plus, Layers, Search, Pencil, Trash2, ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/toast-notification'

interface LevelCategory {
  id: number
  name: string
  display_order: number
  badge_color: string
  description: string | null
}

interface CourseLevel {
  id: number
  name: string
  category_id: number | null
  display_order: number
  badge_color: string
  description: string | null
  category: { id: number; name: string; badge_color: string } | null
}

export default function CourseLevelsPage() {
  const [categories, setCategories] = useState<LevelCategory[]>([])
  const [levels, setLevels] = useState<CourseLevel[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set())
  const [editingCategory, setEditingCategory] = useState<LevelCategory | null>(null)
  const [editingLevel, setEditingLevel] = useState<CourseLevel | null>(null)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showLevelModal, setShowLevelModal] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [catRes, levelRes] = await Promise.all([
        fetch('/api/admin/level-categories'),
        fetch('/api/admin/course-levels'),
      ])
      const catData = await catRes.json()
      const levelData = await levelRes.json()
      setCategories(catData || [])
      setLevels(levelData || [])
      // Expand all categories by default
      setExpandedCategories(new Set(catData.map((c: LevelCategory) => c.id)))
    } catch (error) {
      console.error('Failed to fetch data:', error)
      showToast('Failed to load data', 'error')
    } finally {
      setLoading(false)
    }
  }

  const toggleCategory = (id: number) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    try {
      const res = await fetch(`/api/admin/level-categories/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      showToast('Category deleted', 'success')
      fetchData()
    } catch (error: any) {
      showToast(error.message || 'Failed to delete category', 'error')
    }
  }

  const handleDeleteLevel = async (id: number) => {
    if (!confirm('Are you sure you want to delete this level?')) return
    try {
      const res = await fetch(`/api/admin/course-levels/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      showToast('Level deleted', 'success')
      fetchData()
    } catch (error: any) {
      showToast(error.message || 'Failed to delete level', 'error')
    }
  }

  const filteredLevels = levels.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.description?.toLowerCase().includes(search.toLowerCase())
  )

  const getLevelsByCategory = (categoryId: number) =>
    filteredLevels.filter(l => l.category_id === categoryId)

  const uncategorizedLevels = filteredLevels.filter(l => !l.category_id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Course Levels</h2>
          <p className="text-sm text-slate-600 mt-1">
            Manage level categories (Undergraduate, Postgraduate, Research) and specific qualification types
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => { setEditingCategory(null); setShowCategoryModal(true) }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => { setEditingLevel(null); setShowLevelModal(true) }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Level
          </Button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search levels..."
          className="pl-9 bg-white"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-slate-200 border-t-teal-500" />
        </div>
      ) : categories.length === 0 && levels.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
          <Layers className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600">No course levels configured</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => { setEditingCategory(null); setShowCategoryModal(true) }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add First Category
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div
                className="flex items-center justify-between px-4 py-3 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center gap-3">
                  {expandedCategories.has(category.id) ? (
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  )}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${category.badge_color}`}>
                    {category.name}
                  </span>
                  <span className="text-sm text-slate-500">
                    ({getLevelsByCategory(category.id).length} levels)
                  </span>
                </div>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setEditingCategory(category); setShowCategoryModal(true) }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {expandedCategories.has(category.id) && (
                <div className="p-4">
                  {category.description && (
                    <p className="text-sm text-slate-600 mb-4">{category.description}</p>
                  )}
                  {getLevelsByCategory(category.id).length === 0 ? (
                    <p className="text-sm text-slate-400 italic">No levels in this category</p>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {getLevelsByCategory(category.id).map((level) => (
                        <div
                          key={level.id}
                          className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-teal-300 transition-colors"
                        >
                          <div>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-medium ${level.badge_color}`}>
                              {level.name}
                            </span>
                            {level.description && (
                              <p className="text-xs text-slate-500 mt-1 line-clamp-1">{level.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => { setEditingLevel(level); setShowLevelModal(true) }}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteLevel(level.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {uncategorizedLevels.length > 0 && (
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 bg-slate-50">
                <span className="text-sm font-medium text-slate-700">Uncategorized Levels</span>
              </div>
              <div className="p-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {uncategorizedLevels.map((level) => (
                    <div
                      key={level.id}
                      className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                    >
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-medium ${level.badge_color}`}>
                        {level.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => { setEditingLevel(level); setShowLevelModal(true) }}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteLevel(level.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <CategoryModal
          category={editingCategory}
          onClose={() => setShowCategoryModal(false)}
          onSave={() => { setShowCategoryModal(false); fetchData() }}
        />
      )}

      {/* Level Modal */}
      {showLevelModal && (
        <LevelModal
          level={editingLevel}
          categories={categories}
          onClose={() => setShowLevelModal(false)}
          onSave={() => { setShowLevelModal(false); fetchData() }}
        />
      )}
    </div>
  )
}

// Category Modal Component
function CategoryModal({
  category,
  onClose,
  onSave,
}: {
  category: LevelCategory | null
  onClose: () => void
  onSave: () => void
}) {
  const [name, setName] = useState(category?.name || '')
  const [displayOrder, setDisplayOrder] = useState(category?.display_order || 0)
  const [badgeColor, setBadgeColor] = useState(category?.badge_color || 'badge-slate')
  const [description, setDescription] = useState(category?.description || '')
  const [saving, setSaving] = useState(false)
  const { showToast } = useToast()

  const badgeColors = [
    { value: 'badge-blue', label: 'Blue' },
    { value: 'badge-indigo', label: 'Indigo' },
    { value: 'badge-amber', label: 'Amber' },
    { value: 'badge-orange', label: 'Orange' },
    { value: 'badge-teal', label: 'Teal' },
    { value: 'badge-emerald', label: 'Emerald' },
    { value: 'badge-rose', label: 'Rose' },
    { value: 'badge-purple', label: 'Purple' },
    { value: 'badge-slate', label: 'Slate' },
    { value: 'badge-red', label: 'Red' },
    { value: 'badge-violet', label: 'Violet' },
    { value: 'badge-sky', label: 'Sky' },
    { value: 'badge-cyan', label: 'Cyan' },
    { value: 'badge-green', label: 'Green' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setSaving(true)
    try {
      const url = category
        ? `/api/admin/level-categories/${category.id}`
        : '/api/admin/level-categories'
      const method = category ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, display_order: displayOrder, badge_color: badgeColor, description }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      showToast(category ? 'Category updated' : 'Category created', 'success')
      onSave()
    } catch (error: any) {
      showToast(error.message || 'Failed to save category', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-4">
          {category ? 'Edit Category' : 'Add Category'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label>
            <Input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Badge Color</label>
            <select
              value={badgeColor}
              onChange={(e) => setBadgeColor(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              {badgeColors.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${badgeColor}`}>
                Preview
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving} className="bg-teal-600 hover:bg-teal-700">
              {saving ? 'Saving...' : category ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Level Modal Component
function LevelModal({
  level,
  categories,
  onClose,
  onSave,
}: {
  level: CourseLevel | null
  categories: LevelCategory[]
  onClose: () => void
  onSave: () => void
}) {
  const [name, setName] = useState(level?.name || '')
  const [categoryId, setCategoryId] = useState<number | null>(level?.category_id || null)
  const [displayOrder, setDisplayOrder] = useState(level?.display_order || 0)
  const [badgeColor, setBadgeColor] = useState(level?.badge_color || 'badge-slate')
  const [description, setDescription] = useState(level?.description || '')
  const [saving, setSaving] = useState(false)
  const { showToast } = useToast()

  const badgeColors = [
    { value: 'badge-blue', label: 'Blue' },
    { value: 'badge-indigo', label: 'Indigo' },
    { value: 'badge-amber', label: 'Amber' },
    { value: 'badge-orange', label: 'Orange' },
    { value: 'badge-teal', label: 'Teal' },
    { value: 'badge-emerald', label: 'Emerald' },
    { value: 'badge-rose', label: 'Rose' },
    { value: 'badge-purple', label: 'Purple' },
    { value: 'badge-slate', label: 'Slate' },
    { value: 'badge-red', label: 'Red' },
    { value: 'badge-violet', label: 'Violet' },
    { value: 'badge-sky', label: 'Sky' },
    { value: 'badge-cyan', label: 'Cyan' },
    { value: 'badge-green', label: 'Green' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setSaving(true)
    try {
      const url = level
        ? `/api/admin/course-levels/${level.id}`
        : '/api/admin/course-levels'
      const method = level ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category_id: categoryId,
          display_order: displayOrder,
          badge_color: badgeColor,
          description,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      showToast(level ? 'Level updated' : 'Level created', 'success')
      onSave()
    } catch (error: any) {
      showToast(error.message || 'Failed to save level', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-4">
          {level ? 'Edit Level' : 'Add Level'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select
              value={categoryId ?? ''}
              onChange={(e) => setCategoryId(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="">No Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label>
            <Input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Badge Color</label>
            <select
              value={badgeColor}
              onChange={(e) => setBadgeColor(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              {badgeColors.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${badgeColor}`}>
                Preview
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving} className="bg-teal-600 hover:bg-teal-700">
              {saving ? 'Saving...' : level ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
